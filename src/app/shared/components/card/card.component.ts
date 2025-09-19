import { Component, inject, Input } from '@angular/core';
import { ProductsData } from '../../../core/models/products';
import { RouterLink } from '@angular/router';
import { AddtocartService } from './services/addtocart.service';
import { ToastrService } from 'ngx-toastr';
import { CountCartService } from '../../../core/services/cart/count-cart.service';
import { ProgressSpinner } from 'primeng/progressspinner';



@Component({
  selector: 'app-card',
  imports: [RouterLink,ProgressSpinner],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  private countCartService = inject(CountCartService)
  private addToCartApi = inject(AddtocartService)
  private toster = inject(ToastrService)

  @Input({ required: true }) product: ProductsData = {} as ProductsData


  addToCart(id: string) {

    this.addToCartApi.addToCart(id).subscribe({
      next: (res) => {
        
        if (res.status === 'success') {

          this.toster.success(res.message, res.status);
          this.countCartService.cartCount.next(res.numOfCartItems);

        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }






}
