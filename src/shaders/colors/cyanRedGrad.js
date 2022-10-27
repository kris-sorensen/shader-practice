import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const RainbowGradMaterial =
    shaderMaterial(
        {

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
            
            void main(){

                
                //Final
                gl_FragColor = vec4(vuv.x, vuv.y, vuv.y, 1.);
            }`
    );

export default RainbowGradMaterial