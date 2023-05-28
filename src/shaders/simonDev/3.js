import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro.js";

const LinearVsSmoothstep = shaderMaterial(
  {
    uTime: 0,
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
      // min
      float value1 = vuv.x * (1. - vuv.x) * 4.; // * paraballa
      float value2 = pow(vuv.x, 2.);
      float clampedX = max(min(vuv.x,.62),.38);

      
      // color
      vec3 violet = vec3(1.,0.,1.);
      vec3 cyan = vec3(0.,1.,1.);
      vec3 white = vec3(1.,1.,1.);
      
      // line
      float line = smoothstep(.0, .005, abs(vuv.y - .5));
      float linearLine = smoothstep(.0, .0075, abs(vuv.y - mix(.5,1.,value1)));
      float smoothstepLine = smoothstep(.0, .0075, abs(vuv.y - mix(.0,.5,smoothstep(0., 1.,value2))));
      float clampLine = smoothstep(.0, .0075, abs(vuv.y - mix(.5,1., clampedX)));
      
      vec3 color = vec3(line);


      // mix
      if(vuv.y > .5){
        color = mix(violet, cyan, clampedX);
      }else{
        color = mix(violet, cyan, smoothstep(0., 1., value2));
      }

      
      // color = mix(violet, cyan, smoothstep(0., 1. ,vuv.x));


      color = mix(white, color, line);
      color = mix(white, color, linearLine);
      color = mix(white, color, smoothstepLine);
      // color = mix(white, color, clampLine);


      //Final
      gl_FragColor = vec4(color, 1.0);
    }`
);

export default LinearVsSmoothstep;
