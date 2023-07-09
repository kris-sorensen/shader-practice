import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro.js";
import * as THREE from "three";
const WarpedSphere = shaderMaterial(
  {
    time: { value: 0 },
  },

  // vertex shader
  glsl`
    varying vec2 vuv; 
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float time;
    varying vec3 vColor;

    float inverseLerp(float v, float minValue, float maxValue) {
      return (v - minValue) / (maxValue - minValue);
    }

    float remap(float v, float inMin, float inMax, float outMin, float outMax) {
      float t = inverseLerp(v, inMin, inMax);
      return mix(outMin, outMax, t);
    }

    void main(){
      vec3 localSpacePosition = position;
      
      float t = sin(localSpacePosition.y * 20. + time * 10.);
      t = remap(t, -1., 1., 0., .2);
      localSpacePosition += normal * t;


      // * final
      gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);
      
      // * local space to world space (! renormalize in fragment shader)
      vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

      vPosition = (modelMatrix * vec4(localSpacePosition, 1.)).xyz;
      vColor = mix(vec3(0., 0., 0.5), vec3(.1, .5, .8),smoothstep(0., 0.2, t));



}`,

  // fragment shader
  glsl`
  varying vec2 vuv; 
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vColor;


  
    // color
    vec3 violet = vec3(1.,0.,1.);
    vec3 cyan = vec3(0.,1.,1.);
    vec3 white = vec3(1.,1.,1.);
    vec3 yellow = vec3(1.,1.,0.);

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
      // vec3 color = vec3(1.);
      vec3 modelColor = cyan;

      

      vec3 baseColor = vColor.xyz;
      vec3 lighting = vec3(0.);


      // vec3 normal = normalize(vNormal);
      vec3 normal = normalize(cross(dFdx(vPosition.xyz),dFdy(vPosition.xyz)));
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

      //* Final Lighting
      lighting = ambient * 0. + hemi * 0. + diffuse * 1.5;

      vec3 color = baseColor * lighting;

      //Final
      gl_FragColor = vec4(color, 1.);
    }`
);

export default WarpedSphere;
