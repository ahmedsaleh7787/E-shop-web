import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute } from '@angular/router';
import { CheckOutService } from '../../core/services/checkOut/check-out.service';


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

  CartId: string | null = null;
  checkOutForm!: FormGroup;
  errorMsg:string='';


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



  CheckOutCashSubmit() {

    if (this.checkOutForm.valid) {

      this.CheckOutCash();

    } else {
      this.checkOutForm.markAllAsTouched()
    }
  }


  CheckOutVisa() {

    console.log(this.CartId);
    console.log(this.checkOutForm.value);

    this.CheckOutService.visa(this.CartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
           console.log(res);
           if(res.status === "success"){
            window.open(res.session.url,'_self')
            //i need here http://localhost:4200/allorders and using get user order
           }
           
      },
      error:(err)=>{
         console.log(err.error.message);
         this.errorMsg=err?.error?.message;
         
      }
    })

  }

  CheckOutCash() {

    console.log(this.CartId);
    console.log(this.checkOutForm.value);

    this.CheckOutService.cash(this.CartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
           console.log(res);
           if(res.status === "success"){
            console.log("dddddddddddddddd");
            //i need here page show the order

            
           }
           
      },
      error:(err)=>{
         console.log(err);
         this.errorMsg=err?.error?.message;

         
      }
    })

  }




}
