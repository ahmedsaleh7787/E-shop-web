import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CartDataRes } from '../../models/cart-data-res';

@Injectable({
  providedIn: 'root'
})
export class GetCartFromApiService {
    constructor(private http:HttpClient , private cookieService:CookieService){}
  
  getCartItems():Observable<CartDataRes>{
    return this.http.get<CartDataRes>(`${environment.baseUrl}cart`,{
      headers:{
        token:this.cookieService.get('token')
      }
    })
  }

}
