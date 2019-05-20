import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit() {}

  async autenticar() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await this.auth.auth.signInWithPopup(provider);
    await this.firestore.doc(`/usuarios/${user.uid}`).set({ id: user.uid, nome: user.displayName });
  }
}
