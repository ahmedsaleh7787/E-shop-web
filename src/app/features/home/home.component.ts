import { Component } from '@angular/core';
import { PopularProductsComponent } from "./products/popular-products/popular-products.component";
import { PopularCategoriesComponent } from './products/popular-categories/popular-categories.component';
import { MainSliderComponent } from './products/main-slider/main-slider.component';

@Component({
  selector: 'app-home',
  imports: [PopularProductsComponent,PopularCategoriesComponent,MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent  {

  

}
