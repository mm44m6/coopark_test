import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SwiperModule } from 'ngx-swiper-wrapper';

import { HomePage } from './home.page';
import { CarouselComponent } from '../common/carousel/carousel.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    CarouselComponent
  ]
})
export class HomePageModule {}
