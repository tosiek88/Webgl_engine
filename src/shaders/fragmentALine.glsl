#version 300 es
 // fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default
  precision mediump float;
  out vec4 fragmentColor;
  in vec2 out_pos;
  in float out_width;
 
  void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    
    fragmentColor = vec4(1, 1, 1, 1.0-smoothstep(out_width,1.0,length(out_pos))); // return redish-purple
  }