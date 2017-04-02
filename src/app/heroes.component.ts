import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service'; // <-- No hace falta meterlo en providers pq está en providers de app.module
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
    
  heroes: Hero[];
  selectedHero: Hero;
  title = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor(private heroService: HeroService, private router: Router) { } // <-- Utilizo el servicio aqui pq es singleton al cargarlo en providers de app.component

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);

      // this.getHeroesSlowly();
    }

  onSelect(hero: Hero): void {
  this.selectedHero = hero;
}

getHeroesSlowly(): void {
  this.heroService.getHeroes().then(result => this.heroes = result).catch(error => console.log(error));
}

gotoDetail(): void {
  this.router.navigate(['/detail', this.selectedHero.id]); // <- Hay que importar router y meterlo en constructor
}

add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.create(name)
    .then(hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    });
}

delete(hero: Hero): void {
  this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
}

}



