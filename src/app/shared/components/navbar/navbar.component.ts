import { Component, Input } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CountCartService } from '../../../core/services/cart/count-cart.service';
import { GetCartFromApiService } from '../../../core/services/cart/get-cart-from-api.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, OverlayBadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})


export class NavbarComponent {

  constructor(private flowbiteService: FlowbiteService, private CookieService: CookieService, private countCartService: CountCartService, private readonly router: Router, private getCartFromApiService: GetCartFromApiService) { }

  @Input({ required: true }) isLogin!: boolean;

  countCart!: number




  ngOnInit(): void {

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.addToCount();
    this.GetFirstCount();

  }



  addToCount() {
    this.countCartService.cartCount.subscribe({
      next: (value) => {
        this.countCart = value;
      }
    })

  }



  GetFirstCount() {
    if (this.CookieService.get('token')) {
             //there is a problem here  if (this.CookieService.get('token')) solve it , and if i check if this is browser not server will also solve .. and why it happend i dont know !!?
      this.getCartFromApiService.getCartItems().subscribe({
        next: (res) => {
          this.countCartService.cartCount.next(res.numOfCartItems)
        },
      error: (err) => {
        this.countCartService.cartCount.next(0); 
      }
      })
    }else{
          this.countCartService.cartCount.next(0);
    }

  }



  //signout button logic
  logout() {
    this.CookieService.delete('token');
    this.router.navigate(['/login']);
  }


}
