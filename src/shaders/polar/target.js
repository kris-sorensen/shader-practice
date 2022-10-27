// @ts-ignore: Unreachable code error
import glsl from 'babel-plugin-glsl/macro.js';
import * as THREE from "three";
import { shaderMaterial } from '@react-three/drei';


const TargetMaterial = shaderMaterial(
    {},
    // vertex shader
    glsl`
    
    varying vec2 vuv; 
    
    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // boiler plate code

        vuv = uv;
    }
  `,
    // fragment shader
    glsl`

    varying vec2 vuv; 
    #define PI 3.1415926538

    float toPolar(vec2 vuv){
        float distance = length(vuv);
        float angle = atan(vuv.y, vuv.x);
        return angle / 2.*PI, distance;
    }

    void main() {
        float angle = toPolar(vuv -.5);

        float col = sin(80. * angle);

        gl_FragColor = vec4(vec3(col),1.);
    }
  `
);


export default TargetMaterial;