import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { AddToCartResponse } from '../../../../core/models/add-to-cart-response';


@Injectable({
  providedIn: 'root'
})
export class AddtocartService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  addToCart(id: string): Observable<AddToCartResponse> {
    return this.http.post<AddToCartResponse>(`${environment.baseUrl}cart`, { "productId": id })
  }

}
