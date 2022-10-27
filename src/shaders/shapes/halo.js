import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const HaloMaterial =
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
                
               float circle = length(vuv -.5) * 1.3;
        
                float outerCircle = 1. - smoothstep(.245,.28, circle);
                float innerCircle = smoothstep(.22,.255, circle);
                
                float col = outerCircle * innerCircle ;
                vec3 color = col * vec3(0.,.93,.99);

                //Final
                gl_FragColor = vec4(vec3(color), 1.);
            }`
    );

export default HaloMaterial