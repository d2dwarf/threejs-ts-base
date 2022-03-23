varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  gl_FragColor = vec4(0.0, uv, 1.0);
}
