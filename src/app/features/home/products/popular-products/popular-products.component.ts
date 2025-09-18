import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { ProductsData } from '../../../../core/models/products';
import { CardComponent } from '../../../../shared/components/card/card.component';


@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss'
})
export class PopularProductsComponent implements OnInit {


  private _ProductsService = inject(ProductsService)

  productsList: ProductsData[] = [];

  ngOnInit(): void {

    this.getAllProductsData();

  }


  getAllProductsData() {

    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log("productsList", res);
        this.productsList = res.data;
      },
      error: (err) => {
        console.log(err);

      }
    })

  }


}
