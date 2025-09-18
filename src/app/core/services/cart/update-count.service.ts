import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateCountService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  updateCount(id: string, count: number): Observable<any> {
    return this.http.put(`${environment.baseUrl}cart/${id}`, {count: count} )
  }

}
