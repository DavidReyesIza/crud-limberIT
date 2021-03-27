import { Categoria } from './../../models/categoria';
import { CategoriasService } from './../../services/categorias.service';
import { Producto } from './../../models/producto';
import { ProductosService } from './../../services/productos.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-editar-agregar',
  templateUrl: './editar-agregar.component.html',
  styleUrls: ['./editar-agregar.component.css']
})
export class EditarAgregarComponent implements OnInit {


  public url;
  public producto: Producto;
  public categorias: Categoria[];

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

    this.cargar();
    this.getCategorias();


  }



  public form = this.fb.group({

    id: [''],
    nombre: ['',Validators.required],
    descripcion: ['',Validators.required],
    categoria: ['',Validators.required],
    stock: ['',Validators.required],
    fecha_creacion: ['3/27/2021',Validators.required],
    estado: ['',Validators.required],

  });


/*   cargarCliente() : void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.url= id;
      if (id) {
        this.clienteService.getClienteId(id).subscribe(resp => {
          console.log(resp)
          const {name, email, active} = resp;
          this.form.setValue({email, name, active});
          console.log(this.form.value)
        })
      }
    })
  }  */

 cargar() : void {
    this.activatedRoute.params.subscribe(params => {

      let id = params['id'];
      console.log('el id es ',id)
      this.url= id;

      if (id) {
        this.productoService.getProducto(id).subscribe(producto =>{
          console.log(producto)
          this.producto = producto;
          this.form.setValue({...producto});
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
    this.productoService.editProducto(this.form.value).subscribe((resp: any) =>{

      swal.fire('Actualizado con exito!',
      `Producto  actualizado con exito.`,
      'success')
    })
  }

  public crear() {
    this.productoService.crearProducto(this.form.value).subscribe((resp : any) =>{
      console.log('producto agregado!',resp)
      swal.fire('Producto Agregado',
      `Producto  Agregado con exito.`,
      'success')
    })
  }

  public getCategorias(){
    this.categoriaService.getCategorias().subscribe((resp: any) => {
     this.categorias = this.categoriaService.categoriasGrobal;
    })
  }

}



/*   public form = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    name: new FormControl('',[
      Validators.required
    ]),
    active: new FormControl('',[
      Validators.required
    ])

  }) */
