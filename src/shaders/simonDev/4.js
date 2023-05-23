import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro.js";
import * as THREE from "three";
const LinearVsSmoothstep = shaderMaterial(
  {
    uTime: 0,
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
    vec3 white = vec3(1.0);

    vec3 cyan = vec3(0.0, 1., 1.);
    vec3 pink = vec3(1.0, 0., 1.);
    vec3 yellow = vec3(1.0, 1., 0.);
    
    void main(){
      vec3 color = vec3(0.);
      
      // * Grid
      vec2 center = vuv - .5;
      float amountOfCells = 10.;
      float sizeInPixels = 50.;

      vec2 cell = fract(center * resolution / sizeInPixels * vec2(1.0, aspectRatio));
      cell = abs(cell - .5);
      float distToCell = 1.0 - 2.0 * max(cell.x, cell.y);
      float cellLine = smoothstep(.0, .05, distToCell);

      float xAxis = smoothstep(0., 0.002 / aspectRatio, abs(vuv.y -.5));
      float yAxis = smoothstep(0., 0.002 / aspectRatio, abs(vuv.x -.5));

      // * Lines
      vec2 pos = center * resolution / sizeInPixels * vec2(1.0, aspectRatio);
      // * swap out for round() ceil() floor() fract() mod() to visualize
      float value1 = floor(pos.x); 
      float value2 = pos.x;

      float line1 = smoothstep(0., 0.075 / aspectRatio, abs(pos.y - value1));
      float linearLine = smoothstep(0., 0.075 / aspectRatio, abs(pos.y - value2));


      color = mix(white, color, cellLine);
      color = mix(cyan, color, xAxis);
      color = mix(cyan, color, yAxis);
      color = mix(pink, color, linearLine);
      color = mix(yellow, color, line1);
      
      gl_FragColor = vec4(color, 1.0);
    }`
);

export default LinearVsSmoothstep;
