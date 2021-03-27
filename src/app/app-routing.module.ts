import { EditarAgregarCategoriaComponent } from './components/editar-agregar-categoria/editar-agregar-categoria.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EditarAgregarComponent } from './components/editar-agregar/editar-agregar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: '/categorias', pathMatch:'full'},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'categorias/:id/productos', component: ProductosComponent},
  {path: 'editar-agregar/:id', component: EditarAgregarComponent},
  {path: 'editar-agregar',  component: EditarAgregarComponent},
  {path: 'editar-agregar-categoria/:id', component: EditarAgregarCategoriaComponent},
  {path: 'editar-agregar-categoria', component: EditarAgregarCategoriaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
