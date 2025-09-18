import { CookieService } from 'ngx-cookie-service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forgetpassword',
  imports: [InputComponent, ReactiveFormsModule , StepperModule, ButtonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})


export class ForgetpasswordComponent {

  private readonly auth = inject(AuthService)
  private readonly cookieService = inject(CookieService)
  private readonly fb = inject(FormBuilder)
  private readonly routes = inject(Router)

  forgetEmailForm!: FormGroup;
  getCodeForm!: FormGroup;
  resetPasswordForm!: FormGroup;

  step: number = 1;

  ngOnInit(): void {

    this.initForm();


  }


  initForm() {
    this.forgetEmailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });

    this.getCodeForm = this.fb.group({
      resetCode: [null, [Validators.required]]
    });


    this.resetPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required]]
    });

  }


  loginSubmit1(activateCallback:Function) {

    if (this.forgetEmailForm.valid) {

      
    this.auth.sendEmailForgetPassowrd(this.forgetEmailForm.value).subscribe({
      next: (res) => {
        if (res.statusMsg === "success") {
          console.log(res);
          activateCallback(2);
        }
      },

      error: (err) => {
        console.log(err);

      }
    })
      
    } else {
      this.forgetEmailForm.markAllAsTouched()
    }

  }










  loginSubmit2(activateCallback : Function) {

    if (this.getCodeForm.valid) {

      
    this.auth.verifyCode(this.getCodeForm.value).subscribe({
      next: (res) => {

        console.log(res);

        if (res.status === "Success") {
          console.log(res);
          activateCallback(3)
        }
      },
      error: (err) => {
        console.log(err);

      }
    })

      
    } else {
      this.forgetEmailForm.markAllAsTouched()
    }

  }










  loginSubmit3() {

    if (this.resetPasswordForm.valid) {

      this.resetPassword();


    } else {
      this.forgetEmailForm.markAllAsTouched()
    }

  }



  resetPassword() {
    this.auth.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.token) {
           this.cookieService.set('token',res.token);
           this.routes.navigate(['/home'])
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
