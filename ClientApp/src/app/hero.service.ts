import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
// observable serve a tornare oggetti in modo asincrono (ad esempio tramite una get)
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// importazione del servizio di messaggistica
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // Il message service è iniettato nel servizio HeroService
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // versione mock
  /*
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
  */

  // versione API
  private heroesUrl = 'api/hero';  // URL to web api

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
 
  // CAPIRE COME TORNARE UN ELEMENTO DELL'OBSERVABLE DA LISTA... NON DALLE VECCHIE COSTANTI
  /*
  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id) as Hero;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }*/

  // versione che legge da api la lista ed estrae un elemento
  getHeroFromArray(id: number): Observable<Hero|undefined> {

    let heroes = this.getHeroes();

    let hero = heroes.pipe(
      map(el => el.find((h: Hero) => h.id === id)));

    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return hero;
  }

  // versione che legge da api il singolo elemento
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // versione che legge da api un singolo elemento random
  getRandomHero(): Observable<Hero> {
    const url = `${this.heroesUrl}/random`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched random hero`)),
      catchError(this.handleError<Hero>(`get Random hero`))
    );
  }
  
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


 /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
