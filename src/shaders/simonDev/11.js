import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro.js";
import * as THREE from "three";

const Easings = shaderMaterial(
  {
    time: { value: 0 },
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
    uniform float time;
    varying vec4 vColor;

    float inverseLerp(float v, float minValue, float maxValue) {
      return (v - minValue) / (maxValue - minValue);
    }

    float remap(float v, float inMin, float inMax, float outMin, float outMax) {
      float t = inverseLerp(v, inMin, inMax);
      return mix(outMin, outMax, t);
    }

    mat3 rotateY(float radians){
      float s = sin(radians);
      float c = cos(radians);

      return mat3(
        c, 0., s,
        0., 1., 0.,
        -s, 0., c
      );
    }
    mat3 rotateX(float radians){
      float s = sin(radians);
      float c = cos(radians);

      return mat3(
        1, 0., 0.,
        0., c, -s,
        0., s, c
      );
    }
    mat3 rotateZ(float radians){
      float s = sin(radians);
      float c = cos(radians);

      return mat3(
        c, -s, 0.,
        s, c, 0.,
        0., 0., 1.
      );
    }

    void main(){
      vec3 localSpacePosition = position;
     
      vPosition = (modelMatrix * vec4(localSpacePosition, 1.0)).xyz;


      // * Easing 

      


      // * final
      gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);
      
     
      vec3 violet = vec3(1.,0.,1.);
      vec3 cyan = vec3(0.,1.,1.);
      
      float t = remap(vPosition.x, -.5, .5, 0., 1.);
      vColor = vec4(mix(violet, cyan, t), t);


}`,

  // fragment shader
  glsl`
  varying vec2 vuv; 
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform samplerCube specMap;
  varying vec4 vColor;


  
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
      vec3 color = vec3(1.);
      vec3 modelColor = vColor.xyz;


    

      //Final
      gl_FragColor = vec4(modelColor, 1.);
    }`
);

export default Easings;
