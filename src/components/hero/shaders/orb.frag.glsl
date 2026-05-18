// Verbatim port of the fragment shader in documents/davide-hero-final.html.
// HIGH-CONTRAST: three smoothstep zones (dark wells / bright ridges /
// specular peaks) produce the defined liquid-metal look.
// Do NOT smooth this with pow(). Do NOT widen the smoothstep ranges.

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewPosition;
uniform float uTime;
uniform vec3 uColorCore;
uniform vec3 uColorMid;
uniform vec3 uColorBright;
uniform vec3 uColorRim;

void main() {
  vec3 viewDir = normalize(vViewPosition);

  // Domain warping - creates the liquid flow
  float warpX = snoise(vPosition * 0.7 + vec3(uTime * 0.07, 0.0, 0.0));
  float warpY = snoise(vPosition * 0.7 + vec3(0.0, uTime * 0.05, 0.0));
  vec3 warped = vPosition + vec3(warpX, warpY, 0.0) * 0.7;

  float n1 = snoise(warped * 0.85 + vec3(uTime * 0.08));
  float n2 = snoise(warped * 1.6 + vec3(uTime * 0.05, 0.0, uTime * 0.06));

  // Band pattern - sin -> 3 narrow smoothstep zones for crisp transitions
  float rawBand = sin(n1 * 4.5 + length(vPosition) * 1.4 + uTime * 0.18) * 0.5 + 0.5;
  float darkWell     = smoothstep(0.0, 0.35, rawBand);
  float brightRidge  = smoothstep(0.55, 0.85, rawBand);
  float specularPeak = smoothstep(0.8, 0.98, rawBand);

  // Build up in defined layers from pure black
  vec3 color = uColorCore;
  float radial = length(vPosition.xy) * 0.4 + n2 * 0.18;
  color = mix(color, uColorMid,    darkWell     * smoothstep(0.15, 0.55, radial));
  color = mix(color, uColorBright, brightRidge  * smoothstep(0.25, 0.70, radial));
  color = mix(color, uColorRim,    specularPeak * smoothstep(0.40, 0.85, radial));

  // Tight fresnel rim - defined edge, NOT soft halo bleed
  float fresnelRaw = 1.0 - max(dot(vNormal, viewDir), 0.0);
  float fresnel = smoothstep(0.3, 0.95, fresnelRaw);
  color = mix(color, uColorRim, fresnel * 0.55);

  gl_FragColor = vec4(color, 1.0);
}
