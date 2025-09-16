import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { CategoryData } from '../../../../core/models/category';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})

export class PopularCategoriesComponent implements OnInit {

  constructor(private categories: CategoriesService) { }

  categoryList: CategoryData[] = [];

  ngOnInit(): void {
    this.getCategories();

  }


  //slider
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }



  getCategories() {
    this.categories.getAllCategories().subscribe({

      next: (res) => {
        this.categoryList = res.data;
        console.log("categoryList",res.data);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


}
