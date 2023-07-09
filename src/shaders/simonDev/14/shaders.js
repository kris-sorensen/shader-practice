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
  uniform vec2 resolution;  
  varying vec2 vuv;



  float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
  }

  float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
  }

  vec3 BackgroundColor(){
    float distFromCenter = length(abs(vuv - .5));
    float vignette = 1. - distFromCenter;
    vignette = smoothstep(0., 0.7, vignette);
    vignette = remap(vignette, 0., 1., .3, 1.);
    return vec3(vignette);
  }

  vec3 drawGrid(vec3 color, vec3 lineColor, float cellSpacing, float lineWidth) {
    vec2 center = vuv - .5;
    vec2 cells = abs(fract(center * resolution / cellSpacing) - .5);
    float distToEdge = (0.5 -  max(cells.x, cells.y)) * cellSpacing;
    float lines = smoothstep(0., lineWidth, distToEdge);

    color = mix(lineColor, color, lines);

    return color;
  }
  
  void main() {
    vec2 pixelCoords = (vuv - .5) * resolution;
    
    vec3 color = BackgroundColor();
    color = drawGrid(color, vec3(.5), 10., 1.5);
    color = drawGrid(color, vec3(.5), 100., 3.);

    gl_FragColor = vec4(color, 1.);
  }
`;
