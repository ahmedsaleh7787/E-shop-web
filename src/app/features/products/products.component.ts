import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { ProductsData } from '../../core/models/products';
import { CardComponent } from '../../shared/components/card/card.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";


@Component({
  selector: 'app-products',
  imports: [CardComponent, PaginatorModule, SearchPipe, ɵInternalFormsSharedModule , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})


export class ProductsComponent {

  resultItems!: number;
  private _ProductsService = inject(ProductsService)
  productsList: ProductsData[] = [];
  word:string='';

  //Paginator
  first: number = 0;
  rows: number = 10;
  onPageChange(event: PaginatorState) {

    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    console.log(event);
    const apiPage = (event.page ?? 0) + 1;

    this.getAllProductsData(apiPage)

  }




  ngOnInit(): void {

    this.getAllProductsData();

  }


  getAllProductsData(eventPage: number = 1) {

    this._ProductsService.getAllProducts(eventPage).subscribe({
      next: (res) => {
        console.log("productsList", res);
        this.productsList = res.data;
        this.resultItems = res.results; //use it in html
        this.rows = res.metadata.limit;
      },
      error: (err) => {
        console.log(err);

      }
    })

  }




}
