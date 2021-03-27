import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EditarAgregarComponent } from './components/editar-agregar/editar-agregar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './components/productos/productos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EditarAgregarCategoriaComponent } from './components/editar-agregar-categoria/editar-agregar-categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    EditarAgregarComponent,
    ProductosComponent,
    CategoriasComponent,
    EditarAgregarCategoriaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
