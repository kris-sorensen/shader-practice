


import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const MovingUVGradMaterial =
    shaderMaterial(
        {
            uTime: 0
        },

        // vertex shader
        glsl`
            varying vec2 vuv; 
            uniform float uTime;

            void main(){
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
            // modelPosition.x = (1. + sin(uTime)) * .5;
            // modelPosition.y = ( 1. + sin    (uTime)) * .5;
            


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
            uniform float uTime;
            
            void main(){

                float strengthY = cos((uTime * .8) + vuv.y);
                float strengthX = sin((uTime * .8) + vuv.x);
                
                //Final
                gl_FragColor = vec4(strengthX, strengthY, 1., 1.);
            }`
    );

export default MovingUVGradMaterial