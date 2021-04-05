import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { interval, Observable, Subscription, timer, of, from } from 'rxjs';
import { Hero } from '../hero';
import { map, distinct, take } from 'rxjs/operators';

@Component({
  selector: 'app-hero-timer-random',
  templateUrl: './hero-timer-random.component.html',
  styleUrls: ['./hero-timer-random.component.css']
})
export class HeroTimerRandomComponent implements OnInit {
  
  constructor(private heroService: HeroService) { }

  subscription!: Subscription;
  currentHeroName: string = 'default hero name';

  ngOnInit() {

    // un timer è ancora un observable
    this.subscription = timer(0, 2000)
      // altero il flusso prodotto dal timer (sarebbe un contatore normalmente)
      .pipe(
        // mappo l'output tornando il valore prodotto da un'ulteriore observable prodotta dall'hero service
        map(() => this.heroService.getRandomHero()))
      // mi iscrivo all'observable del timer, il valore result in realtà è un altro observable, quindi mi iscrivo pure a quello
      .subscribe(result => result.subscribe(x => this.currentHeroName = x.name));

    // -------------------------------------------------------------------------
    // ALCUNI ESEMPI PER CAPIRE LE OBSERVABLE

    // creazione di un observable tramite of()
    var myObs = of(1, 2, 3, 4, 5, 1, 2, 3, 4);
    myObs
        // alterazione di un observable con funzione pipe
      .pipe(
        // eseguo la distinct  
      distinct(),
        // prendo solo i primi 3 elementi
      take(3))
        // consumo di un observable
        .subscribe(val => { console.log(val) });

   
    // creazione di un observable tramite Observable.create
    var myObs2 = Observable.create(function (observer: any) {
      observer.next('myObs2 > elemento 1');
      observer.next('myObs2 > elemento 2');
      observer.complete();
    });
    const subscribe = myObs2.subscribe((val: string) => console.log(val));

    // come il precedente ma con lambda per definire la function
    var myObs3 = Observable.create((obs:any) => {
      obs.next('myObs3 > elem 1');
      obs.next('myObs3 > elem 2');
      obs.complete();
    });
    // consumo senza variabile di appoggio
    myObs3.subscribe((val: string) => console.log(val));


    var myobjects = [{ name: 'pippo', value: 1 },
    { name: 'pippo', value: 2 },
    { name: 'pluto', value: 3 },
      { name: 'paperino', value: 4 }];
    // creo observalble usando from questa volta
    var myObs4 = from(myobjects);
    myObs4
      // altero il flusso
      .pipe(
        // eseguo la distinct sul nome
        distinct(e => e.name),
        // estraggo solo il nome e non l'intera classe alterando l'output (come la select in linq)
        map(e => e.name)
      )
      // mi iscrivo all'output dell'observable
      .subscribe(v => console.log(v));

    
    // interval è un observable che genera un contatore che incrementa ogni x millisecondi
    // effettuando una subscribe si può definire così una funzione che prende in ingresso quel numero e fa qualcosa con esso
    var arr = interval(1000);
    arr.subscribe(function (num: number) {
      console.log('Elemento Osservato ' + num);
    });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
