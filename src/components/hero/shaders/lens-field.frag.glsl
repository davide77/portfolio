// Lens hero field: soft sage/amber bands from a noise-rotated coordinate, with
// darker accent bands laid over them so colour only shows in the gaps. A soft
// circle opens it out of black during the intro.
uniform float uTime, uFreq, uZoom, uOpacity, uReveal, uShadowAmount;
uniform vec3 uColorA, uColorB, uShadow;
uniform vec2 uRes;
varying vec3 vPos;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
                 mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
                 mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

// Soft band profile: offset shifts which part of the sine wave reads as "on".
float band(float x, float offset) {
  float w = abs(sin(x * 3.14159) + offset * 2.0) * 0.5;
  return smoothstep(0.0, 0.5 + offset * 0.5, w);
}

void main() {
  float n = vnoise(uFreq * vPos + uTime);
  vec2 q = rot(n) * vPos.xy * uZoom * 10.0;

  vec3 base = mix(uColorA, uColorB, band(q.x, 0.5));
  vec3 col = mix(base, uShadow, band(q.x, 0.1) * uShadowAmount);

  vec2 st = gl_FragCoord.xy / uRes - 0.5;
  st.y *= uRes.y / uRes.x;
  float r = 0.05 + uReveal * uReveal * 1.2;
  float mask = 1.0 - smoothstep(r * 0.6, r, length(st));
  mask = max(mask, step(1.0, uReveal));

  gl_FragColor = vec4(col * mask, uOpacity);
}
