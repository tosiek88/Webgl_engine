#version 300 es
// an attribute will receive data from a buffer
precision mediump float;
in vec2 pos;
in vec2 norm;
uniform mat4 u_ortho;
uniform float u_width;
out vec2 out_pos;
out float out_width;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = vec4(pos.x+norm.x*u_width,pos.y+norm.y*u_width,0,1)*u_ortho;
  out_pos=norm;
  out_width=u_width;
}
