import { Categoria } from './../models/categoria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const base_url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  public categoriasGrobal: Categoria[];

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  getCategorias(){

    const url = `${base_url}/categorias`;
    return this.http.get<Categoria[]>(url)
    .pipe(
      map((resp:Categoria[])=>{
        const categorias = resp.map(
          resp => new Categoria(resp.nombre,resp.descripcion,resp.fecha_creacion,resp.estado,resp.id)
        )
        this.categoriasGrobal = categorias;

        return {
         categorias
        }
      })
    )

  }


  getCategoria(id: number): Observable<Categoria>{
    const url = `${base_url}/categorias`
    return this.http.get<Categoria>(`${url}/${id}`)

  }

  editCategoria(producto: Categoria): Observable<Categoria>{
    const url = `${base_url}/categorias`
    return this.http.put<Categoria>(`${url}/${producto.id}`,producto,{headers: this.httpHeaders})
  }

  crearCategoria(categoria: Categoria) : Observable<Categoria>{
    const url = `${base_url}/categorias`;
    return this.http.post<Categoria>(url,categoria,{headers: this.httpHeaders});
  }

  eliminarCategoria(id:number){
    const url = `${base_url}/categorias`;
    return this.http.delete(`${url}/${id}`,{headers: this.httpHeaders});
  }
}
