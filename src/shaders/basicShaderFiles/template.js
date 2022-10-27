import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const Bwgrad =
    shaderMaterial(
        {

        },

        // vertex shader
        glsl`
            void main(){
            
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                

                //Final
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;
                gl_Position = projectedPosition;

        }`,
        // fragment shader
        glsl`
            void main(){
                //Final
                gl_FragColor = vec4(vec3(1., .5, .5), 1.);
            }`
    );

export default Bwgrad