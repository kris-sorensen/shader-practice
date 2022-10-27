import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';
import * as THREE from "three";


const SpiralMaterial = shaderMaterial(
  { uSize: 1, uStrength: 1.7, uTime: 0, uFadeStart: 0, uFadeEnd: 0, uResetPoint: 0 },
  // vertex shader
  glsl`
    uniform float uSize;
    uniform float uTime;
    uniform float uResetPoint;
    uniform float uStrength;

    attribute float aVelocities;
    attribute float aSpeeds;
    
    varying vec2 vuv; 

    #define PI 3.14159265359;

    void main(){

      vec4 modelPosition = modelMatrix * vec4(position, 1.0);

      // move particles overtime to right
      // float x = modelPosition.x * uTime * aSpeeds;
      
      // reset particle position when it reaches end
      // x = mod(x, uResetPoint);
      
      // shape graph
      // float y = -pow(x * aVelocities, uStrength) ;

      // float curve = 5.;
      // modelPosition.x = (1. - (x * curve) ) ; 
      // modelPosition.y = y;

      
      
      // Spiral 
      float vt = uTime * .1 * PI;
      vt *= aVelocities;
      float x = (vt * 5. + .1) * cos(vt);
      float y = (vt * 5. + .1) * sin(vt);

      // modelPosition.x = sin(abs(x * .01));
      // modelPosition.y = cos(abs(y * .01));
    
      modelPosition.x = x * .01;
      modelPosition.y = y * .01;
      // modelPosition.z += uTime * aVelocities;



      //Final
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;

      // Props
      vuv = uv;
      
      /*
      * Size
      */
      gl_PointSize = uSize * 8.;

    }
  `,
  // fragment shader
  glsl`
    uniform float uTime;
    uniform float uResetPoint;
    uniform float uStrength;
    uniform float uFadeEnd;
    uniform float uFadeStart;

    varying vec2 vuv; 
    
    void main() {
      //Light point pattren (difuse point that fades faster)
      float strength = distance(gl_PointCoord, vec2(.5));
      strength = 1. - strength;
      strength = pow(strength, 8.);


      gl_FragColor = vec4(1.,.1, 1., strength);
    }
  `
);



export default SpiralMaterial