import { CategoriasService } from './services/categorias.service';
import { ProductosService } from './services/productos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


/*

  cargarProductos(){
    this.productoService.getProductos().subscribe(resp =>{
      console.log('Productos globales',this.productoService.productosGlobal)
    })
  }
 */




  title = 'crud';
}

