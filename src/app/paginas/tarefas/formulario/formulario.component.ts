import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, tap, first } from 'rxjs/operators';
import { NEVER, combineLatest } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  formulario = this.formBuilder.group({ id: [], descricao: ['', Validators.required] });

  valorAtual$ = combineLatest(this.route.params, this.fireAuth.user)
    .pipe(tap(() => this.formulario.reset()))
    .pipe(switchMap(([p, u]) => (p && p.id && u ? this.obterDadosTarefa(p.id, u.uid) : NEVER)))
    .pipe(tap(c => c && this.formulario.patchValue(c)));

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async salvar() {
    if (this.formulario.valid) {
      const usuario = await this.fireAuth.user.pipe(first()).toPromise();
      const tarefa = this.formulario.value;
      tarefa.id = tarefa.id || this.firestore.createId();
      await this.router.navigateByUrl('/tarefas');
      await this.firestore.doc<any>(`/usuarios/${usuario.uid}/tarefas/${tarefa.id}`).set(tarefa);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Ops, preencha corretamente o formulário!',
        duration: 3000
      });
      await toast.present();
    }
  }

  private obterDadosTarefa(id: string, usuario: string) {
    return this.firestore.doc<any>(`/usuarios/${usuario}/tarefas/${id}`).valueChanges();
  }
}
