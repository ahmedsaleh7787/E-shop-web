import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserOrder } from '../../models/user-order';

@Injectable({
  providedIn: 'root'
})
export class GetUserOrdersService {

  constructor(private http: HttpClient) {

  }

  getUserOrder(userId: string):Observable<UserOrder> {
   return this.http.get<UserOrder>(`${environment.baseUrl}orders/user/${userId}`)
  }



}
