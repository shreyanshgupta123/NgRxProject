// src/app/app.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthState } from './NgrxStore/auth.reducer';
import { login, loginFailure, loginSuccess } from './NgrxStore/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, AsyncPipe, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  username: string = '';
  password: string = '';
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  user$: Observable<any>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.loading$ = this.store.select(state => state.auth.loading);
    this.error$ = this.store.select(state => state.auth.error);
    this.user$ = this.store.select(state => state.auth.user);
  }

  onSubmit() {
    this.store.dispatch(login({ username: this.username, password: this.password }));

    if (this.username === 'aman' && this.password === 'aman') {
      this.store.dispatch(loginSuccess({ message: 'hii' }));
    } else {
      this.store.dispatch(loginFailure({ error: 'Invalid credentials' }));
    }
  }
}
