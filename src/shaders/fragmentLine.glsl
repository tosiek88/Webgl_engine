#version 300 es
 // fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default
  precision mediump float;
  out vec4 fragmentColor;
  in vec2 out_position;
 
  void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    fragmentColor = vec4(1, 0, 0.5, (0.5-out_position.x)+1.0); // return redish-purple
  }