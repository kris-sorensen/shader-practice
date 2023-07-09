export const vertexShader = `
    varying vec2 vuv; // A varying 2D vector for uv coordinates
    varying vec3 vNormal; // A varying 3D vector for normals
    varying vec3 vPosition; // A varying 3D vector for positions

    void main(){
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // Transforming the vertex position from model coordinates to screen coordinates
      vuv = uv; // Passing the uv coordinates to the fragment shader
      // * local space to world space (! renormalize in fragment shader)
      vNormal = (modelMatrix * vec4(normal, 0.0)).xyz; // Transforming the vertex normals to world space
      vPosition = (modelMatrix * vec4(position, 1.)).xyz; // Transforming the vertex position to world space
}`;

export const fragmentShader = `
  varying vec2 vuv; // uv coordinates passed from the vertex shader
  varying vec3 vNormal; // normals passed from the vertex shader
  varying vec3 vPosition; // positions passed from the vertex shader
  uniform samplerCube specMap; // uniform variable for the environment map

  // color
  vec3 violet = vec3(1.,0.,1.); // defining a 3D vector for the color violet
  vec3 cyan = vec3(0.,1.,1.); // defining a 3D vector for the color cyan
  vec3 white = vec3(1.,1.,1.); // defining a 3D vector for the color white

  float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
  }

  float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
  }

  vec3 linearTosRGB(vec3 value ){
    vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));
    vec3 v1 = value * 12.92;
    vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);
    return mix(v2, v1, lt);
  }

  void main(){
    vec3 baseColor = vec3(.25,0.,0.); // Initializing the base color
    vec3 lighting = vec3(0.); // Initializing the lighting
    vec3 normal = normalize(vNormal); // Normalizing the normals passed from the vertex shader
    vec3 viewDir = normalize(cameraPosition - vPosition); // Defining the view direction

    //* Ambient Light
    vec3 ambient = vec3(0.5); // Initializing the ambient light color

    //* Hemisphere Light
    vec3 skyColor = vec3(.8,.8,.65); // Initializing the sky color for hemispheric lighting
    vec3 groundColor = vec3(.1,.1,.2); // Initializing the ground color for hemispheric lighting

    float hemiMix = remap(normal.y, -1., 1.,0., 1.); // Remapping the y-component of the normal vector
    vec3 hemi = mix(groundColor, skyColor,  hemiMix); // Interpolating between ground and sky color based on the hemiMix value

    //* Diffuse Lighting (direct/sun)
    vec3 lightDir = normalize(vec3(1., 1., 1.)); // Defining the light direction
    vec3 lightColor = vec3(1.,1.,.9); // Defining the light color
    float dp = max(0., dot(lightDir, normal)); // Calculating the dot product between light direction and the normal

    vec3 diffuse = dp * lightColor; // Calculating the diffuse light

    //* Phong Specular 
    vec3 r = normalize(reflect(-lightDir, normal)); // Calculating the reflection of the light
    float phongValue = max(0., dot(viewDir, r)); // Calculating the phong value based on the dot product between the view direction and the reflection
    phongValue = pow(phongValue, 32.); // Modifying the phong value by raising it to the power of 32
    vec3 specular = vec3(phongValue); // Initializing the specular light color

    // * IBL Specular Environment Lighting
    vec3 iblCoord = normalize(reflect(-viewDir, normal)); // Calculating the IBL coordinates based on the reflection of the view direction and the normal
    vec3 iblSample = textureCube(specMap, iblCoord).xyz; // Sampling the specMap at the iblCoord position

    specular += iblSample * .5; // Adding the iblSample to the specular light color

    // * Fresnel
    float fresnel = 1. - max(0., dot(viewDir, normal)); // Calculating the Fresnel effect
    fresnel = pow(fresnel, 2.); // Modifying the Fresnel effect by raising it to the power of 2

    specular *= fresnel; // Multiplying the specular light color with the Fresnel effect

    //* Final Lighting
    lighting = ambient * 0. + hemi * 0. + diffuse * .5; // Calculating the final lighting

    vec3 color = baseColor * lighting + specular; // Calculating the final color

    //* Show Normals
    // color = normal;

    //! color space => always do this for lighting
    // color = linearTosRGB(color); // OR
    color = pow(color, vec3(1. / 2.2)); // About the same

    //Final
    gl_FragColor = vec4(color, 1.0); // Setting the final color of the pixel
  }`;
