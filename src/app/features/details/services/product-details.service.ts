import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { DetailsProduct } from '../../../core/models/details-product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  
constructor(private http:HttpClient){}

getProductDetails(id:string|null):Observable<DetailsProduct>{
return this.http.get<DetailsProduct>(`${environment.baseUrl}products/${id}`)
}

}
