// Verbatim port of the vertex shader in documents/davide-hero-final.html.

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewPosition;

uniform float uTime;

void main() {
  float n = snoise(position * 0.5 + vec3(uTime * 0.06));
  vec3 displaced = position + normal * n * 0.04;
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  vViewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  vPosition = displaced;
  gl_Position = projectionMatrix * mvPosition;
}
