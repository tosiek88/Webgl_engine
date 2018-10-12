#version 300 es
// an attribute will receive data from a buffer
precision mediump float;
in vec2 a_position;
in vec2 a_normals;
uniform mat4 u_ortho;
out vec2 out_position;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = vec4(a_position,0,1)*u_ortho;
  out_position=a_position;
}
