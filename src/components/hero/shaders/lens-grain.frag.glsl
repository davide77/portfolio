// Lens hero film grain: brightening-only noise, reseeded each frame.
uniform sampler2D tDiffuse;
uniform float uSeed, uAmount;
varying vec2 vUv;

float rnd(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233)) + uSeed) * 43758.5453);
}

void main() {
  vec4 c = texture2D(tDiffuse, vUv);
  c.rgb += rnd(vUv * vec2(1731.0, 977.0)) * uAmount;
  gl_FragColor = c;
}
