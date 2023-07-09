export const vertexShader = `
  uniform float time;
  varying vec2 vuv; 
  
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
   
    //Final
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
  

    // Props
      vuv = uv;
  }
`;

export const fragmentShader = `
  uniform float time;  
  varying vec2 vuv;
  
  
  void main() {
    
    vec3 color = vec3(1.,0.,0.);

  gl_FragColor = vec4(color, 1.);
  }
`;
