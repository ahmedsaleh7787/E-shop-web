import { CommonModule, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GetCartFromApiService } from '../../core/services/cart/get-cart-from-api.service';
import { CartDataRes } from '../../core/models/cart-data-res';
import { RemoveCartItemService } from '../../core/services/cart/remove-cart-item.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { UpdateCountService } from '../../core/services/cart/update-count.service';
import { RouterLink } from '@angular/router';
import { CountCartService } from '../../core/services/cart/count-cart.service';


@Component({
  selector: 'app-cart',
  imports: [TitleCasePipe, CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {

  cartDetails: CartDataRes = {} as CartDataRes;

  private getCartData = inject(GetCartFromApiService)
  private removeItems = inject(RemoveCartItemService)
  private toastrService = inject(ToastrService)
  private updateCountService = inject(UpdateCountService)
  private countCartService = inject(CountCartService)


  ngOnInit(): void {
    this.getCartItems();
  }



  getCartItems() {
    this.getCartData.getCartItems().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;

      },
      error: (err) => {
        console.log(err);

      }
    })
  }



  removeItem(id: string) {
    this.removeItems.getCartItems(id).subscribe({
      next: (res) => {

        console.log('delete', res);
        this.cartDetails = res;
        if (res.status === 'success') {

          this.countCartService.cartCount.next(res.numOfCartItems);
          this.toastrService.warning("Item Removed")
          
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }



  updateCount(id: string, count: number) {
    this.updateCountService.updateCount(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;

      },
      error: (res) => {
        console.log(res);

      }
    })
  }

}
