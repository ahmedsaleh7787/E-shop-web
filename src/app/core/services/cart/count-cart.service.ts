import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountCartService {

  cartCount:BehaviorSubject<number>=new BehaviorSubject(0)

  
}
