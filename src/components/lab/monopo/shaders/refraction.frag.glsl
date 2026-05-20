uniform samplerCube t_cube;

varying vec3 v_reflect;
varying vec3 v_refract_r;
varying vec3 v_refract_g;
varying vec3 v_refract_b;
varying float v_reflectionFactor;

void main() {
  vec4 reflectedColor = textureCube(t_cube, vec3(-v_reflect.x, v_reflect.yz));
  vec4 refractedColor = vec4(1.0);

  refractedColor.r = textureCube(t_cube, vec3(-v_refract_r.x, v_refract_r.yz)).r;
  refractedColor.g = textureCube(t_cube, vec3(-v_refract_g.x, v_refract_g.yz)).g;
  refractedColor.b = textureCube(t_cube, vec3(-v_refract_b.x, v_refract_b.yz)).b;

  gl_FragColor = mix(refractedColor, reflectedColor, clamp(v_reflectionFactor, 0.0, 1.0));
}
