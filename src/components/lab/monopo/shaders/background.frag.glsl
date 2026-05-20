uniform float u_time;
uniform float u_patternScale;
uniform float u_patternBias1;
uniform float u_patternBias2;
uniform vec3 u_firstColor;
uniform vec3 u_secondColor;
uniform vec3 u_accentColor;

varying vec3 v_pos;

float lines(vec2 uv, float offset) {
  float val = abs(0.5 * (sin(uv.x * 30.0) + offset * 2.0));
  return smoothstep(0.0, 0.5 + offset * 0.5, val);
}

mat2 rotate2D(float angle) {
  return mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle)
  );
}

void main() {
  float n = noise31(v_pos + u_time);

  vec2 baseUV = rotate2D(n) * v_pos.xy * u_patternScale;
  float basePattern = lines(baseUV, u_patternBias1);
  float secondPattern = lines(baseUV, u_patternBias2);

  vec3 baseColor = mix(u_secondColor, u_firstColor, basePattern);
  vec3 secondBaseColor = mix(baseColor, u_accentColor, secondPattern);

  gl_FragColor = vec4(secondBaseColor, 1.0);
}
