import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterData } from '../../../core/models/register-data';
import { RegInterfaceRes } from '../../../core/models/reg-interface-res';
import { LoginSendToApi } from '../../../core/models/login-send-to-api';
import { LoginResInterface } from '../../../core/models/login-res-interface';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { Tokendecode } from '../../models/tokendecode';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router, private CookieService: CookieService) { }


  //send data to Register
  postDataRegister(RegisterData: RegisterData): Observable<RegInterfaceRes> {
    return this.http.post<RegInterfaceRes>(`${environment.baseUrl}auth/signup`, RegisterData)
  }

  //send data to login
  postDataLogin(LoginData: LoginSendToApi): Observable<LoginResInterface> {
    return this.http.post<LoginResInterface>(`${environment.baseUrl}auth/signin`, LoginData)
  }


  sendEmailForgetPassowrd(email: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/forgotPasswords`, email)
  }

  verifyCode(code: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/verifyResetCode`, code)
  }


  resetPassword(info: object): Observable<any> {
    return this.http.put(`${environment.baseUrl}auth/resetPassword`, info)
  }

  

  //get token decoded
  token:Tokendecode ={} as Tokendecode;

  decodeToken() {
    try {
      this.token = jwtDecode(this.CookieService.get('token'))

    } catch (error) {
      this.signout();
    }

    return this.token;
  }


  //signout button logic
  signout() {
    this.CookieService.delete('token');
    this.router.navigate(['/login']);
  }

}
