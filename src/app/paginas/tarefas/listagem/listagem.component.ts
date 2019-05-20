import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {
  constructor(private fireAuth: AngularFireAuth) {}

  ngOnInit() {}

  async sair() {
    await this.fireAuth.auth.signOut();
  }
}
