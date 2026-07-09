// Flow-field background plane vertex shader.
// Ported from the monopo.vn hero (Three r131), re-skinned for this project.
// vUv carries the plane's raw local position (unit plane => [-0.5, 0.5]); the
// silhouette and offset come from the mesh transform via modelViewMatrix.
varying vec3 vUv;

void main() {
  vUv = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
