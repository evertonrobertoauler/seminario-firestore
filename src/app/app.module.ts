import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

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
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(ROTAS),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
