import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ProductsMain } from '../../models/products-main';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http:HttpClient){}
  
  getAllProducts(pageNumber:number=1):Observable<ProductsMain>{
    return this.http.get<ProductsMain>(`${environment.baseUrl}products?page=${pageNumber}`)
  }
  
  
}
