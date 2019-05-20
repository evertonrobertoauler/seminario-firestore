import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, first } from 'rxjs/operators';
import { NEVER } from 'rxjs';
import { User } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent {
  tarefas$ = this.fireAuth.user.pipe(
    switchMap(user => (user ? this.obterTarefasUsuario(user) : NEVER))
  );

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async sair() {
    await this.fireAuth.auth.signOut();
  }

  async adicionar() {
    await this.router.navigateByUrl('/tarefas/adicionar');
  }

  async editar(tarefa) {
    await this.router.navigateByUrl(`/tarefas/${tarefa.id}`);
  }

  async excluir(tarefa) {
    const usuario = await this.fireAuth.user.pipe(first()).toPromise();
    await this.firestore.doc(`/usuarios/${usuario.uid}/tarefas/${tarefa.id}`).delete();
  }

  private obterTarefasUsuario(usuario: User) {
    return this.firestore.collection<any>(`/usuarios/${usuario.uid}/tarefas`).valueChanges();
  }
}
