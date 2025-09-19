import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CheckOutService } from '../../core/services/checkOut/check-out.service';
import { CountCartService } from '../../core/services/cart/count-cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly CheckOutService = inject(CheckOutService)
  private route = inject(Router)
  private countCartService = inject(CountCartService)
  private toastrService = inject(ToastrService)

  CartId: string | null = null;
  checkOutForm!: FormGroup;


  ngOnInit(): void {

    this.initForm();
    this.getCartId();

  }



  initForm(): void {

    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]],
        city: [null, [Validators.required]]
      })
    })

  }



  getCartId() {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.CartId = urlParams.get('cartId');
      }
    })
  }




  CheckOutVisaSubmit() {

    if (this.checkOutForm.valid) {

      this.CheckOutVisa();

    } else {
      this.checkOutForm.markAllAsTouched()
    }

  }




  CheckOutVisa() {

    this.CheckOutService.visa(this.CartId, this.checkOutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === "success") {
          window.open(res.session.url, '_self')
        }

      },
      error: (err) => {
        console.log(err.error.message);

      }
    })

  }





  CheckOutCashSubmit() {

    if (this.checkOutForm.valid) {

      this.CheckOutCash();

    } else {
      this.checkOutForm.markAllAsTouched()
    }
  }


  CheckOutCash() {

    this.CheckOutService.cash(this.CartId, this.checkOutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === "success") {
          this.toastrService.info("set new order successfully")
          this.countCartService.cartCount.next(0);
          this.route.navigate(['/allorders'])

        }

      },
      error: (err) => {
        console.log(err);

      }
    })

  }




}
