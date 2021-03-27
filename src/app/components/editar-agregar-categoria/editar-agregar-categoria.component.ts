import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from './../../models/categoria';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/services/categorias.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-agregar-categoria',
  templateUrl: './editar-agregar-categoria.component.html',
  styleUrls: ['./editar-agregar-categoria.component.css']
})
export class EditarAgregarCategoriaComponent implements OnInit {



  public url;

  public categoria: Categoria

  public estadosValidos = [
    {
      estado: true,
      visibilidad : 'Activo'
    },
    {
      estado: false,
      visibilidad : 'Inactivo'
    }
  ]

  public formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoService: ProductosService,
    private fb: FormBuilder,
    public categoriaService: CategoriasService
    ) { }

  ngOnInit(): void {
    this.cargar()
  }

  public form = this.fb.group({

    id: [''],
    nombre: ['',Validators.required],
    descripcion: ['',Validators.required],
    fecha_creacion: ['3/27/2021',Validators.required],
    estado: ['',Validators.required],

  });


  cargar() : void {
    this.activatedRoute.params.subscribe(params => {

      let id = params['id'];
      console.log('el id es ',id)
      this.url= id;

      if (id) {
        this.categoriaService.getCategoria(id).subscribe(categoria =>{
          console.log(categoria)
          this.categoria = categoria;
          this.form.setValue({...categoria});
        })
      }
    })
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.form.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }

  public editar (){
    this.categoriaService.editCategoria(this.form.value).subscribe((resp: any) =>{
      this.router.navigate(['/categorias']);
      swal.fire('Actualizado con exito!',
      `Categoria actualizada con exito.`,
      'success')
    })
  }

  public crear() {
    this.categoriaService.crearCategoria(this.form.value).subscribe((resp : any) =>{
      console.log('Categoria agregada!',resp)
      this.router.navigate(['/categorias']);
      swal.fire('Categoria Agregada!',
      `Categoria  Agregada con exito.`,
      'success')
    })
  }

}
