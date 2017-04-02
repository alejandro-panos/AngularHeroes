import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Hero } from './hero';
import { HeroService } from './hero.service'; // <-- No hace falta meterlo en providers pq está en providers de app.module


@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
   hero: Hero;
    // @Input() hero: Hero;
    constructor(
  private heroService: HeroService,
  private route: ActivatedRoute,
  private location: Location
) {}

 ngOnInit(): void {
  this.route.params
    .switchMap((params: Params) => this.heroService.getHero(+params['id'])) // <-- the route parameter value is converted to a number with the JavaScript (+) operator
    .subscribe(hero => this.hero = hero);
}

goBack(): void {
  this.location.back(); // <- navigates backward one step in the browser's history stack using the Location service
}

save(): void {
  this.heroService.update(this.hero)
    .then(() => this.goBack());
}


}