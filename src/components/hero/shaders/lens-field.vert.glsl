// Lens hero field. The mesh is a unit sphere stretched to fill the frustum;
// the camera sees its far inner wall, and the fragment shader paints bands
// from the object-space position.
varying vec3 vPos;

void main() {
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
