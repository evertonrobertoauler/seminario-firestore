import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationEnd } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private eventos$ = this.router.events
    .pipe(map(e => (e instanceof NavigationEnd ? e : null)))
    .pipe(filter(ev => !!ev));

  constroleNavegacao$ = combineLatest(this.auth.user, this.eventos$).pipe(
    tap(([user, nav]) => {
      const url = nav.urlAfterRedirects || nav.url;

      if (user && url === '/login') {
        this.router.navigateByUrl('/tarefas');
      } else if (!user && url !== '/login') {
        this.router.navigateByUrl('/login');
      }
    })
  );

  constructor(private auth: AngularFireAuth, private router: Router) {}
}
