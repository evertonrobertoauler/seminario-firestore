import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { ListagemComponent } from './paginas/tarefas/listagem/listagem.component';
import { FormularioComponent } from './paginas/tarefas/formulario/formulario.component';

const ROTAS: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tarefas', component: ListagemComponent },
  { path: 'tarefas/adicionar', component: FormularioComponent },
  { path: 'tarefas/:id', component: FormularioComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [AppComponent, LoginComponent, ListagemComponent, FormularioComponent],
  imports: [BrowserModule, IonicModule.forRoot(), RouterModule.forRoot(ROTAS)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
