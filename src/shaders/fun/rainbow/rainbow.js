export const vertexShader = `
  precision mediump float;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }

`;

export const fragmentShader = `
precision mediump float;

varying vec2 vUv;

void main() {
  float hue = vUv.y;
  vec3 color = vec3(1.0);

  float pi = 3.1415926535897932384626433832795;
  float _2pi = 2.0 * pi;
  
  // Convert the hue to RGB using a rainbow color mapping
  color.g = abs(hue * _2pi - pi) / pi;
  color.b = abs(hue * _2pi - 2.0 * pi / 3.0) / (2.0 * pi / 3.0);
  color.r = abs(hue * _2pi - 4.0 * pi / 3.0) / (2.0 * pi / 3.0);
  
  // Reduce the effect of the abs function near 0 and 1
  // color.r = clamp(color.r, 0.0, 1.0);
  // color.g = clamp(color.g, 0.0, 1.0);
  // color.b = clamp(color.b, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}

`;
