import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap, of, map, catchError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }

  getCurrentUser (): User | undefined {
    if (!this.user) return undefined;
    return structuredClone (this.user);
  }

  login (email: string, password: string): Observable <User> {
    //this.httpClient.post('login', {email, password})

    return this.httpClient.get <User> (`${this.baseUrl}/users/1`)
        .pipe(
          tap (user => this.user = user),
          tap( user => localStorage.setItem('token', user.id.toString()))
        );
  }

  logout (): void {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication (): Observable <boolean> {
    if (!localStorage.getItem('token')) return of (false);

    const token = localStorage.getItem('token');

    return this.httpClient.get <User> (`${this.baseUrl}/users/1`)
                .pipe(
                  tap (user => this.user = user),
                  map( user => !!user),
                  catchError (err => of (false))
                );

  }

}
