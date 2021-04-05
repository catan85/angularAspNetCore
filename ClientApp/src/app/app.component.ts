import { Component } from '@angular/core';
import { HeroService } from './hero.service';
import { Observable } from 'rxjs';
import { Hero } from './hero';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My first angular app';

  constructor(
      private router: Router,
      private heroService: HeroService
    ) { }


  goRandomHero(): void {
    let randomHero = this.getRandomHeroNumber();
    randomHero.subscribe(x => this.router.navigate(['/detail', x]));
  }

  getRandomHeroNumber(): Observable<number|undefined> {
    return this.heroService.getRandomHero()
      .pipe(
        map( h => h.id)
        );
  }
  


}
