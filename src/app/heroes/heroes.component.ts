import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes'; // Mock-data
import { HeroService } from '../hero.service'; // Hero Server
// import { MessageService } from '../message.service'; // Message Server


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // selectedHero?: Hero;
  //heroes = HEROES;
  heroes: Hero[] = []; 
  
  constructor(private heroService: HeroService, 
    // private messageService: MessageService
    ) {}
  
  ngOnInit(): void {
    this.getHeroes();
  }

  //OBSERVABLE - rxjs
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}


