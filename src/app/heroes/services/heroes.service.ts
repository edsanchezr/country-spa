import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getHeroes (): Observable <Hero []> {
    return this.httpClient.get <Hero []> (`${this.baseUrl}/heroes`);
  }

  getHerobyId (id: string): Observable <Hero | undefined> {
    return this.httpClient.get <Hero> (`${this.baseUrl}/heroes/${id}`)
              .pipe(
                catchError ( error => of (undefined))
              );
  }

  getSugestions (query: string): Observable <Hero []> {
    return this.httpClient.get <Hero []> (`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }
}
