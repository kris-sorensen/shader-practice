import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro.js";
import * as three from "three";

const SmoothstepFur = shaderMaterial(
  {
    tFur: new three.Texture(),
  },

  // vertex shader
  glsl`
    varying vec2 vuv; 

    void main(){
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      //Final
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;

      // Props
      vuv = uv;
}`,
  // fragment shader
  glsl`
    varying vec2 vuv;
    uniform sampler2D tFur; 
    
    void main(){

      // float smoothstepLine = smoothstep(.0, .0075, abs(vuv.y - mix(.0,.5,smoothstep(0., 1.,vuv.x))));
      
      // vec3 color = vec3(smoothstepLine);

      vec4 color = texture2D(tFur, vec2(smoothstep(0.,1.,vuv)));


      //Final
      gl_FragColor =  vec4(color);
    }`
);

export default SmoothstepFur;
