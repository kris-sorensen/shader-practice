// Converting Linear => sRGB

//1. Linear => Gamma
//2. Gamma => sRGB

vec3 to STGB(vec3 value ){
  vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));
    v1 = value * 12.92;
    vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);

    return mix(v2, v1, lt);
}