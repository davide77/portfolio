uniform float u_refractionRatio;
uniform float u_fresnelBias;
uniform float u_fresnelScale;
uniform float u_fresnelPower;
uniform float u_time;

varying vec3 v_reflect;
varying vec3 v_refract_r;
varying vec3 v_refract_g;
varying vec3 v_refract_b;
varying float v_reflectionFactor;

void main() {
  vec3 pos = position;
  vec3 norm = normal;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);

  vec3 worldNormal = normalize(mat3(modelMatrix) * norm);
  vec3 i = worldPosition.xyz - (cameraPosition + 0.001);

  v_reflect = reflect(i, worldNormal);
  v_refract_r = refract(normalize(i), worldNormal, u_refractionRatio);
  v_refract_g = refract(normalize(i), worldNormal, u_refractionRatio * 0.99);
  v_refract_b = refract(normalize(i), worldNormal, u_refractionRatio * 0.98);
  v_reflectionFactor =
    u_fresnelBias + u_fresnelScale * pow(1.0 + dot(normalize(i), worldNormal), u_fresnelPower);

  gl_Position = projectionMatrix * mvPosition;
}
