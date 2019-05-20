import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AngularFireAuth) {}

  ngOnInit() {}

  async autenticar() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.auth.auth.signInWithPopup(provider);
  }
}
