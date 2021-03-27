import { Producto } from './../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos : Producto[]

  constructor(public productosService : ProductosService,
              private activadteRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    //this.getProductos();

    this.cargarProductos();
  }


  cargarProductos(){
    this.productosService.getProductos().subscribe(resp =>{
      console.log('Productos globales',this.productosService.productosGlobal)

      this.activadteRoute.params.subscribe(params => {
        let id = params['id'];
        console.log(id);
        if(id){
         this.productos = this.productosService.productosGlobal.filter(producto => producto.categoria == id)
         console.log(this.productos)
        }
      })
    })
  }



  getProductos(){

    this.activadteRoute.params.subscribe(params => {
      let id = params['id'];
      console.log(id);
      if(id){
       this.productos = this.productosService.productosGlobal.filter(producto => producto.id !== id)
      }
    })
  }

  eliminar(id: number){

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: "No podra recuperar este producto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borralo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.eliminarProducto(id).subscribe((producto: any) => {

        });

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Tu producto ha sido Eliminado.',
          'success'
        )

        this.productos = this.productos.filter(producto => producto.id !== id)
        this.router.navigateByUrl('/mantenimiento')

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Eliminacion Cancelada',
          'error'
        )
      }
    })


  }



}
