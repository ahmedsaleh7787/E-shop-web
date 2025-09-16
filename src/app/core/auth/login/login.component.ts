
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import {CookieService} from 'ngx-cookie-service'; 

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  flag: boolean = true;
  private readonly fb = inject(FormBuilder)
  loginForm!: FormGroup;

  //api variables
  private path: AuthService = inject(AuthService);
  private route: Router = inject(Router);
  isLoading = signal<boolean>(false);
  errorMsg = signal<string>("");
  subscribe:Subscription=new Subscription()
  platformId = inject(PLATFORM_ID);

  private readonly cookieService=inject(CookieService) 

  ngOnInit(): void {
    this.loginInitForm();
  }

  //for eye icon in html
  changeFlag() { this.flag = !this.flag }

  //all data input and validation
  loginInitForm(): void {

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]]
    })

  }

  //when press submit
  loginSubmit() {

    if (this.loginForm.valid) {

      this.logIn();
    } else {
      this.loginForm.markAllAsTouched()
    }

  }



  //send login data to api and loader
  logIn() {
    this.subscribe.unsubscribe();
    this.isLoading.set(true);
    this.subscribe=this.path.postDataLogin(this.loginForm.value).subscribe(
      {
        next: (res) => {
          console.log("login response", res);
          if (res.message == "success") {
            this.isLoading.set(false);
   
            this.cookieService.set('token',res.token) 
            
           //maybe i will use it
           console.log("decodeToken",this.path.decodeToken()) 

            this.route.navigate(["/home"])
          }
        },

        error: (err) => {
          console.log(err);
          this.errorMsg.set(err.error.message);
          this.isLoading.set(false);
        },

      })
  }







}










