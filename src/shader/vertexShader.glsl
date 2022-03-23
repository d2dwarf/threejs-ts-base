// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;
// uniform vec2 resolution;

// attribute vec3 position;
// attribute vec2 uv;

varying vec2 vUv;

void main() {
  vec4 pos = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * pos;

  vUv = uv;
}