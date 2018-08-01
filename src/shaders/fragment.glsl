#version 300 es
 // fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default
  precision mediump float;
  out vec4 fragmentColor;
 
  void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    fragmentColor = vec4(1, 0, 0.5, 1); // return redish-purple
  }