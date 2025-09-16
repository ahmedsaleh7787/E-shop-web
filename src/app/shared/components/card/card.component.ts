import { Component, inject, Input } from '@angular/core';
import { ProductsData } from '../../../core/models/products';
import { RouterLink } from '@angular/router';
import { AddtocartService } from './services/addtocart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

@Input({required:true})product:ProductsData = { } as ProductsData 

private addToCartApi=inject(AddtocartService)

private toster=inject(ToastrService)

addToCart(id:string){

this.addToCartApi.addToCart(id).subscribe({
  next:(res)=>{
console.log(res);
      if(res.status==='success'){
          
          this.toster.success(res.message,res.status); 
        }

  },
  error:(err)=>{
console.log(err);

  }
})
}
}
