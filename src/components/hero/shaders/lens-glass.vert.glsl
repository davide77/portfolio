// Lens hero glass letter. Passes view-space normal/position (for the
// screen-space refraction) and the letter's own centre (for magnification).
varying vec3 vNormalV, vViewPos, vReflect, vCentre;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec3 N = normalize(mat3(modelMatrix) * normal);
  vReflect = reflect(normalize(world.xyz - cameraPosition), N);
  vNormalV = normalize(normalMatrix * normal);
  vec4 mv = viewMatrix * world;
  vViewPos = mv.xyz;
  vCentre = (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  gl_Position = projectionMatrix * mv;
}
