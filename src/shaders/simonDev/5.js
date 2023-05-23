import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro.js";
import * as THREE from "three";
const LinearVsSmoothstep = shaderMaterial(
  {
    time: 0,
    resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    aspectRatio: {
      value: window.innerWidth / window.innerHeight,
    },
  },

  // vertex shader
  glsl`
    varying vec2 vuv; 

    void main(){
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;

      vuv = uv;
}`,

  // fragment shader
  glsl`
    varying vec2 vuv; 
    uniform vec2 resolution;
    uniform float aspectRatio;
    uniform float time; 

    vec3 white = vec3(1.0);
    vec3 cyan = vec3(0.0, 1., 1.);
    vec3 pink = vec3(1.0, 0., 1.);
    vec3 yellow = vec3(1.0, 1., 0.);

    float inverseLerp(float v, float minValue, float maxValue){
      return (v - minValue) / (maxValue - minValue);
    }

    float remap(float v, float inMin, float inMax, float outMin, float outMax){
      float t = inverseLerp(v, inMin, inMax);
      return mix(outMin, outMax, t);
    }
    
    void main(){
      vec3 color = vec3(0.);

      // float t = sin(time);
      // t = remap(t, -1., 1., 0., 1.);
      // color = mix(cyan, pink, t);

      float t = sin(vuv.y * 100. + (time * 5.));

      // t = remap(t, -1., 1., 0.,1.);

      color = vec3(t);



      gl_FragColor = vec4(color, 1.0);
    }`
);

export default LinearVsSmoothstep;
