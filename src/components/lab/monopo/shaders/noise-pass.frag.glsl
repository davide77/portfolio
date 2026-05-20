uniform sampler2D tDiffuse;
uniform float u_scale;

varying vec2 v_uv;

float random(vec2 p) {
  vec2 k1 = vec2(
    23.14069263277926,
    2.665144142690225
  );
  return fract(cos(dot(p, k1)) * 12345.6789);
}

void main() {
  vec4 color = texture2D(tDiffuse, v_uv);

  vec2 uvrandom = v_uv;
  uvrandom.y *= random(vec2(uvrandom.y, 0.4));
  color.rgb += random(uvrandom) * u_scale;

  gl_FragColor = color;
}
