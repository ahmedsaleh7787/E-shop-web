import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AllCategoryInfo } from '../../models/all-category-info';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    constructor(private http:HttpClient){}
  
  getAllCategories():Observable<AllCategoryInfo>{
    return this.http.get<AllCategoryInfo>(`${environment.baseUrl}categories`)
  }
  
  
}
