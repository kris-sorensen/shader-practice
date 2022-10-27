import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro.js';

const Smily =
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
            #define PI 3.14159265359
            varying vec2 vuv; 

            uniform float uTime;


            float circle(vec2 xy, float radius, vec2 origin){
                float circle =  distance(xy, origin);
                circle = step(circle, radius);
                return circle;
            }
            
            void main(){
                //circle
                float x = vuv.x - .5;
                float y = vuv.y - .5;
                float radius = ((1. + sin(uTime)) * .2) + .2; // variable radius based on time
                vec2 origin = vec2(0.);
                
                // create smiley
                float c1 = circle(vec2(x,y), radius, origin);
                float eyer = circle(vec2(x,y), radius * .166, vec2(.1,.1));
                float eyel = circle(vec2(x,y), radius * .166, vec2(-.1,.1));
                float mouth = circle(vec2(x,y), radius * .5, vec2(.0,-.08));
                float mouthCut = 1. - circle(vec2(x,y), radius * .5, vec2(.0,-.05));
                mouth = mouth * mouthCut;
               
                // float w = fWidth(y);
                
                
                // color
                vec3 yellow = vec3(1.0,1.,0.);
                vec3 color = vec3(c1 - eyer - eyel - mouth) * yellow;


                //Final
                gl_FragColor = vec4(vec3(color), 1.);
            }`
    );

export default Smily