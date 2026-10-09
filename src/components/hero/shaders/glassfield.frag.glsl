// Glass-hero field. Two levels of domain warping over two-octave simplex fbm
// give the slow, organic pooling of the monopo.vn hero: very large, soft
// olive and amber forms fading into near-black pools. Only two octaves on
// purpose: finer detail pops in and out between frames and reads as busy.
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
uniform float uWarp;        // domain-warp strength, in noise units
uniform float uPoolLow;
uniform float uPoolHigh;
uniform float uReveal;
uniform vec2 uPointer;
uniform vec2 uFocus;       // DD centre, in viewport-height units from the middle
uniform float uFocusLift;
uniform float uFocusInner;
uniform float uFocusOuter;

float fbm(vec3 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 2; i++) {
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
    fbm(vec3(uv + uWarp * q + vec2(1.7, 9.2) + uPointer, t * 0.8)),
    fbm(vec3(uv + uWarp * q + vec2(8.3, 2.8), t * 0.7))
  );
  float f = fbm(vec3(uv + uWarp * 1.1 * r, t * 0.6)) * 0.5 + 0.5;

  // Hue: olive where the first warp is calm, amber where it folds. The
  // range is biased low so amber and olive share the frame about evenly,
  // as in monopo.vn's hero.
  float hue = smoothstep(-0.05, 0.62, length(q) * 0.9 + r.x * 0.45);
  vec3 col = mix(uOlive, uAmber, hue);

  // Luminance: the warped value decides what falls into black pools.
  float lum = smoothstep(uPoolLow, uPoolHigh, f);

  // Keep a glow under the glass so it always has colour to refract.
  float focusDist = length(vUv.xy * vec2(uAspect, 1.0) - uFocus);
  float focus = 1.0 - smoothstep(uFocusInner, uFocusOuter, focusDist);
  lum = max(lum, focus * uFocusLift * (0.75 + 0.25 * f));
  col = mix(uVoid, col, lum);

  // A thin warm sheen on the brightest folds.
  col = mix(col, uHighlight, smoothstep(0.78, 0.98, f) * 0.35);

  // Reveal: the field opens outward from the centre out of black.
  float d = length(vUv.xy * vec2(uAspect, 1.0));
  float open = smoothstep(uReveal * 1.6 - 0.35, uReveal * 1.6, d);
  col = mix(col, uVoid, open * (1.0 - uReveal));

  gl_FragColor = vec4(col, 1.0);
}
