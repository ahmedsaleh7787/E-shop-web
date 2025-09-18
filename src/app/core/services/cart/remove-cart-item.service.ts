import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CartDataRes } from '../../models/cart-data-res';

@Injectable({
  providedIn: 'root'
})
export class RemoveCartItemService {
      constructor(private http:HttpClient , private cookieService:CookieService){}
  
  getCartItems(id:string):Observable<CartDataRes>{
    return this.http.delete<CartDataRes>(`${environment.baseUrl}cart/${id}`)
  }

}
