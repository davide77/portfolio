// Lens hero glass letter. Flat faces need real see-through, which a cube map
// (direction-only) cannot give, so the letter bends a screen copy of the field
// by its normal, splitting RGB, and pulls samples toward its centre so the
// inside never lines up with what surrounds it. Reflections, a dark grazing
// contour and three studio lights give it body.
uniform sampler2D uScreen;
uniform samplerCube uEnv;
uniform vec2 uRes;
uniform float uStrength, uDispersion, uOpacity, uMagnify, uBody;
varying vec3 vNormalV, vViewPos, vReflect, vCentre;

float spec(vec3 N, vec3 V, vec3 L, float shine) {
  return pow(max(dot(N, normalize(L + V)), 0.0), shine);
}

void main() {
  vec3 N = normalize(vNormalV);
  vec3 V = normalize(-vViewPos);
  float facing = clamp(dot(N, V), 0.0, 1.0);
  float fresnel = 0.04 + 0.96 * pow(1.0 - facing, 5.0);

  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 off = N.xy * uStrength * (1.0 - facing * 0.6);
  off += (vViewPos.xy - vCentre.xy) * uMagnify;
  vec3 refr = vec3(
    texture2D(uScreen, uv - off).r,
    texture2D(uScreen, uv - off * (1.0 + uDispersion)).g,
    texture2D(uScreen, uv - off * (1.0 + uDispersion * 2.0)).b);

  // Thicker-looking glass where it turns away: slight warm absorption.
  refr *= mix(vec3(1.0), vec3(0.78, 0.74, 0.66), pow(1.0 - facing, 1.5));
  refr = refr * (1.0 + uBody) + uBody * 0.25;

  vec3 refl = textureCube(uEnv, vec3(-vReflect.x, vReflect.yz)).rgb;
  vec3 col = mix(refr, refl * 1.8 + 0.12, fresnel);

  col *= mix(1.0, 0.35, smoothstep(0.35, 0.05, facing));

  col += vec3(1.0, 0.96, 0.9) * spec(N, V, normalize(vec3(-0.5, 0.7, 0.6)), 50.0) * 0.55;
  col += vec3(1.0) * spec(N, V, normalize(vec3(-0.3, 0.5, 0.8)), 300.0) * 1.4;
  col += vec3(0.85, 0.95, 0.9) * spec(N, V, normalize(vec3(0.7, -0.4, 0.3)), 70.0) * 0.45;

  gl_FragColor = vec4(col, uOpacity);
}
