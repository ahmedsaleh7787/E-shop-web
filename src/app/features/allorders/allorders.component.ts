import { Component } from '@angular/core';
import { GetUserOrdersService } from '../../core/services/userOrders/get-user-orders.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartItem, Root2, ShippingAddress, UserOrder } from '../../core/models/user-order';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {

  constructor(private getUserOrdersService: GetUserOrdersService, private authService: AuthService) { }
  lastUerOrder: CartItem[] = []
  lastUerOrderInfo: ShippingAddress = {} as ShippingAddress

  allOrders: UserOrder = []

  token!: string;
  ngOnInit(): void {

    this.token = this.authService.decodeToken().id
    this.getOrdersUserData();

  }


  getOrdersUserData() {
    this.getUserOrdersService.getUserOrder(this.token).subscribe({
      next: (res) => {
        this.lastUerOrder = res[res.length - 1].cartItems;
        this.lastUerOrderInfo = res[res.length - 1].shippingAddress;

        this.allOrders = res
        console.log("dataforuser", res);


      },
      error: (err) => {
        console.log(err);

      }
    })

  }

}
