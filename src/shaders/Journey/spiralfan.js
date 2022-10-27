import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const SpiralfanMaterial =
    shaderMaterial(
        {
            uTime: 0
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
            uniform float uTime;
            #define PI 3.14159265359

            void main(){

                // spin
                float angle = atan(vuv.x, vuv.y); 

                

                float distanceToCenterX =  length(vuv.x);
                float distanceToCenterY =  length(vuv.y);
                float angleOffsetX = (1. / distanceToCenterX) * uTime * 1.; 
                float angleOffsetY = (1. / distanceToCenterY) * uTime * 1.; 
                float angleY = angle + angleOffsetY;
                float angleX = angle + angleOffsetX;
              
                float strengthX = step(.5,cos(angleX) * distanceToCenterX);
                float strengthY = step(.5,sin(angleY) * distanceToCenterY) ;
               
                //Final
                gl_FragColor = vec4(strengthX, strengthY,strengthX, 1.);
            }`
    );

export default SpiralfanMaterial