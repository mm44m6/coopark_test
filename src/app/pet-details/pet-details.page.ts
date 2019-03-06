import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PetsService } from '../common/pets.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.page.html',
  styleUrls: ['./pet-details.page.scss'],
})
export class PetDetailsPage implements OnInit, OnDestroy {

  id: string;
  subscription: any;
  pet: Observable<any>;

  constructor(private route: ActivatedRoute, private petService: PetsService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.pet = this.petService.getPetById(this.id);
   });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
