import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { CheckoutVisaSessionResponse } from '../../models/checkout-visa-session-response';

@Injectable({
  providedIn: 'root'
})

export class CheckOutService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  visa(CartId: string | null, shippingInfo: object): Observable<CheckoutVisaSessionResponse> {
    return this.http.post<CheckoutVisaSessionResponse>(`${environment.baseUrl}orders/checkout-session/${CartId}?url=http://localhost:4200`, shippingInfo)
  }



  cash(CartId: string | null, shippingInfo: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}orders/${CartId}`, shippingInfo)
  }


}
