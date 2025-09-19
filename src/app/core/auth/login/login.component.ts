
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
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
  subscribe: Subscription = new Subscription()

  private readonly cookieService = inject(CookieService)
  private toastrService = inject(ToastrService)

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
    this.subscribe = this.path.postDataLogin(this.loginForm.value).subscribe(
      {
        next: (res) => {
          console.log("login response", res);
          if (res.message == "success") {

            this.cookieService.set('token', res.token)
            this.toastrService.info("logged in successfully")
            this.route.navigate(["/home"])

          }
        },

        error: (err) => {
          console.log(err);
        },

      })
  }







}










