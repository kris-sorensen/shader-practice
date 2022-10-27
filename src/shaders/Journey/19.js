import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const FrameMaterial =
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

                // float x = 1. - step(.3,vuv.x );
                // float xr = step(.7, vuv.x);
                // x += xr;

                // float y = 1. - step(.3,vuv.y );
                // float yr = step(.7, vuv.y);
                // y += yr;

                // float strength = x + y;


                float strength = step(.2, max(abs(vuv.x - .5 ), abs(vuv.y - .5)));



               
                //Final
                gl_FragColor = vec4(vec3(strength), 1.);
            }`
    );

export default FrameMaterial