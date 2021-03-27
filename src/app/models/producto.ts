export class Producto {
  constructor(
    public nombre: string,
    public descripcion: string,
    public categoria : string,
    public stock : number,
    public fecha_creacion : string,
    public estado : boolean,
    public id? : number
  ){}
}
