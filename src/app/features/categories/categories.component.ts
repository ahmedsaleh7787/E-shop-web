import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { AllCategoryInfo } from '../../core/models/all-category-info';


@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})


export class CategoriesComponent {

  category: AllCategoryInfo = {} as AllCategoryInfo
  
  private categoriesService = inject(CategoriesService)

  ngOnInit(): void {

    this.getAllCategories();

  }



  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.category = res
      },
      error: (err) => {
        console.log(err);

      }
    })
  }




  


}
