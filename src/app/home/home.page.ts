import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { Observable } from 'rxjs';

import { PetsService } from '../common/pets.service';
import { Pet } from '../common/pet';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: false,
    pagination: false
  };

  constructor(public petService: PetsService, private router: Router) { }

  foundPets: Observable<Pet>;
  lostPets: Observable<Pet>;

  details(petId) {
    this.router.navigate(['/pet-details', petId]);
  }

  ngOnInit() {
    this.foundPets = this.petService.getPets('found');
    this.lostPets = this.petService.getPets('lost');
  }

}
