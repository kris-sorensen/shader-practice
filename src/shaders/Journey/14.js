import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const LGridMaterial =
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
            
            void main(){

               float barX = step(.4, mod(vuv.x * 10., 1.)) * step(.8, mod(vuv.y * 10., 1.));
               float barY = step(.8, mod(vuv.x * 10., 1.)) * step(.4, mod(vuv.y * 10., 1.));
               float strength = barX + barY;

                //Final
                gl_FragColor = vec4(vec3(strength), 1.);
            }`
    );

export default LGridMaterial