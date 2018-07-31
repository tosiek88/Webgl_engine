export default class VBO{
    private _vbo:WebGLBuffer|null;
    private _buffor:Float32Array=new Float32Array([]);

    public constructor(private _gl:WebGL2RenderingContext){
        this._vbo=this._gl.createBuffer();        
    }

    public setData(data:number[]){
        this._buffor=new Float32Array(data);
        this._gl.bufferData(this._gl.ARRAY_BUFFER,  this._buffor, this._gl.STATIC_DRAW);
    }

    public bind(){
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER,this._vbo);
    }

    public unbind(){
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, 0);
    }
}