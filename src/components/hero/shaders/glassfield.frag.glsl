// Glass-hero field. Two levels of domain warping over simplex fbm give the
// slow, organic pooling of the monopo.vn hero: olive and amber forms that
// fade into large near-black pools, never straight bands.
//
// snoise() comes from noise.glsl, prepended at build time.
// Coordinates come from the plane's own UVs, not gl_FragCoord, so the field
// renders identically into the glass's refraction buffer and to the screen.
// Colours arrive as linear uniforms and leave linear; the effect composer
// encodes to sRGB.

varying vec3 vUv;

uniform vec3 uVoid;
uniform vec3 uOlive;
uniform vec3 uAmber;
uniform vec3 uHighlight;
uniform float uTime;
uniform float uAspect;
uniform float uScale;
uniform float uPoolLow;
uniform float uPoolHigh;
uniform float uReveal;
uniform vec2 uPointer;

float fbm(vec3 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 3; i++) {
    sum += amp * snoise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 0.0);
    amp *= 0.5;
  }
  return sum;
}

void main() {
  vec2 uv = vUv.xy * vec2(uAspect, 1.0) * uScale;
  float t = uTime;

  vec2 q = vec2(
    fbm(vec3(uv, t)),
    fbm(vec3(uv + vec2(5.2, 1.3), t * 0.9))
  );
  vec2 r = vec2(
    fbm(vec3(uv + 1.2 * q + vec2(1.7, 9.2) + uPointer, t * 0.8)),
    fbm(vec3(uv + 1.2 * q + vec2(8.3, 2.8), t * 0.7))
  );
  float f = fbm(vec3(uv + 1.3 * r, t * 0.6)) * 0.5 + 0.5;

  // Hue: olive where the first warp is calm, amber where it folds.
  float hue = smoothstep(0.15, 0.75, length(q) * 0.9 + r.x * 0.45);
  vec3 col = mix(uOlive, uAmber, hue);

  // Luminance: the warped value decides what falls into black pools.
  float lum = smoothstep(uPoolLow, uPoolHigh, f);
  col = mix(uVoid, col, lum);

  // A thin warm sheen on the brightest folds.
  col = mix(col, uHighlight, smoothstep(0.78, 0.98, f) * 0.35);

  // Reveal: the field opens outward from the centre out of black.
  float d = length(vUv.xy * vec2(uAspect, 1.0));
  float open = smoothstep(uReveal * 1.6 - 0.35, uReveal * 1.6, d);
  col = mix(col, uVoid, open * (1.0 - uReveal));

  gl_FragColor = vec4(col, 1.0);
}
