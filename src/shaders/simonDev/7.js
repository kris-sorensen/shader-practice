import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro.js";
import * as THREE from "three";
const Lighting = shaderMaterial(
  {
    // specMap: new THREE.CubeTexture({
    //   images: [
    //     "/cubeMap/nx.png",
    //     "/cubeMap/ny.png",
    //     "/cubeMap/nz.png",
    //     "/cubeMap/px.png",
    //     "/cubeMap/py.png",
    //     "/cubeMap/pz.png",
    //   ],
    // }),
    // resolution: {
    // aspectRatio: {
    //   value: window.innerWidth / window.innerHeight,
    // },
  }, //   value: new THREE.Vector2(window.innerWidth, window.innerHeight),
  // },

  // vertex shader
  glsl`
    varying vec2 vuv; 
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main(){
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      
     

      vuv = uv;
      // * local space to world space (! renormalize in fragment shader)
      vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

      vPosition = (modelMatrix * vec4(position, 1.)).xyz;

}`,

  // fragment shader
  glsl`
  varying vec2 vuv; 
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform samplerCube specMap;


  
    // color
    vec3 violet = vec3(1.,0.,1.);
    vec3 cyan = vec3(0.,1.,1.);
    vec3 white = vec3(1.,1.,1.);

    float inverseLerp(float v, float minValue, float maxValue) {
      return (v - minValue) / (maxValue - minValue);
    }

    float remap(float v, float inMin, float inMax, float outMin, float outMax) {
      float t = inverseLerp(v, inMin, inMax);
      return mix(outMin, outMax, t);
    }

    vec3 linearTosRGB(vec3 value ){
      vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));
      vec3 v1 = value * 12.92;
      vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);
      return mix(v2, v1, lt);
    }


    
    void main(){
      vec3 baseColor = vec3(.25,0.,0.);
      vec3 lighting = vec3(0.);
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(cameraPosition - vPosition);

      //* Ambient Light
      vec3 ambient = vec3(0.5);

      //* Hemisphere Light
      vec3 skyColor = vec3(.8,.8,.65);
      vec3 groundColor = vec3(.1,.1,.2);

      float hemiMix = remap(normal.y, -1., 1.,0., 1.);
      vec3 hemi = mix(groundColor, skyColor,  hemiMix);

      //* Diffuse Lighting (direct/sun)
      vec3 lightDir = normalize(vec3(1., 1., 1.));
      vec3 lightColor = vec3(1.,1.,.9);
      float dp = max(0., dot(lightDir, normal));

      vec3 diffuse = dp * lightColor;


      //* Phong Specular 
      vec3 r = normalize(reflect(-lightDir, normal));
      float phongValue = max(0., dot(viewDir, r));
      phongValue = pow(phongValue, 32.);
      vec3 specular = vec3(phongValue);


      // * IBL Specular Environment Lighting
      vec3 iblCoord = normalize(reflect(-viewDir, normal));
      vec3 iblSample = textureCube(specMap, iblCoord).xyz;

      specular += iblSample * .5;


      // * Fresnel
      float fresnel = 1. - max(0., dot(viewDir, normal));
      fresnel = pow(fresnel, 2.);

      specular *= fresnel;

      //* Final Lighting
      lighting = ambient * 0. + hemi * 0. + diffuse * .5;

      vec3 color = baseColor * lighting + specular;

      //* Show Normals
      // color = normal;

      
      //! color space => always do this for lighting
      // color = linearTosRGB(color); // OR
      color = pow(color, vec3(1. / 2.2)); // About the same

      //Final
      gl_FragColor = vec4(color, 1.0);
    }`
);

export default Lighting;
