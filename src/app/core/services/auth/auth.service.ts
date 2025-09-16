import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { RegisterData } from '../../../core/models/register-data';
import { RegInterfaceRes } from '../../../core/models/reg-interface-res';
import { LoginSendToApi } from '../../../core/models/login-send-to-api';
import { LoginResInterface } from '../../../core/models/login-res-interface';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {CookieService} from 'ngx-cookie-service'; 


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router:Router ,private CookieService:CookieService ) { }

  
  //send data to Register
  postDataRegister(RegisterData: RegisterData): Observable<RegInterfaceRes> {
    return this.http.post<RegInterfaceRes>(`${environment.baseUrl}auth/signup`, RegisterData)
  }

  //send data to login
  postDataLogin(LoginData: LoginSendToApi): Observable<LoginResInterface> {
    return this.http.post<LoginResInterface>(`${environment.baseUrl}auth/signin`, LoginData)
  }

  //maybe i will use it
  decodeToken() {
    let token;

    try {
    } catch (error) {
      this.signout();
    }

    return token;
  }


  //signout button logic
signout(){
 this.CookieService.delete('token');
 this.router.navigate(['/login']) ;
}

}
