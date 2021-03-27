import { Producto } from './../models/producto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const base_url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  public productosGlobal: Producto[];

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getProductos(){
    const url = `${base_url}/productos`
    return this.http.get<Producto[]>(url)
    .pipe(
      map((resp:Producto[])=>{
        const productos = resp.map(
          resp => new Producto(resp.nombre,resp.descripcion,resp.categoria,resp.stock,resp.fecha_creacion,resp.estado,resp.id)
        );
        this.productosGlobal = productos;

        return {
          productos
        }
      })
    )
  }

  getProducto(id: number): Observable<Producto>{
    const url = `${base_url}/productos`
    return this.http.get<Producto>(`${url}/${id}`)

  }

  editProducto(producto: Producto): Observable<Producto>{
    const url = `${base_url}/productos`
    return this.http.put<Producto>(`${url}/${producto.id}`,producto,{headers: this.httpHeaders})
  }

  crearProducto(producto: Producto) : Observable<Producto>{
    const url = `${base_url}/productos`;
    return this.http.post<Producto>(url,producto,{headers: this.httpHeaders});
  }

  eliminarProducto(id:number){
    const url = `${base_url}/productos`;
    return this.http.delete(`${url}/${id}`,{headers: this.httpHeaders});
  }




}
