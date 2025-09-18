import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetCartFromApiService } from './get-cart-from-api.service';

@Injectable({
  providedIn: 'root'
})
export class CountCartService {

  cartCount:BehaviorSubject<number>=new BehaviorSubject(0)

  
}
