import { Router } from '@angular/router';
import { Categoria } from './../../models/categoria';
import { CategoriasService } from './../../services/categorias.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public categorias

  constructor(private categoriaService: CategoriasService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(){
   this.categoriaService.getCategorias().subscribe(resp =>{
    this.categorias = this.categoriaService.categoriasGrobal
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
        this.categoriaService.eliminarCategoria(id).subscribe((producto: any) => {

        });

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Categoria eliminada!.',
          'success'
        )

        this.categorias = this.categorias.filter(producto => producto.id !== id)
       // this.router.navigateByUrl('/mantenimiento')

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
