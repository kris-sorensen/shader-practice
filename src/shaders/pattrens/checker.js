import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const Checker =
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
            #define PI 3.14159265359
            varying vec2 vuv; 
            
            void main(){
                //circle
                float x = vuv.x - .5;
                float y = vuv.y - .5;
                float col = length(x * y);
                col = step(col, x * y);


                //Final
                gl_FragColor = vec4(vec3(col), 1.);
            }`
    );

export default Checker