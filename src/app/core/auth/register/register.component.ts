

import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  registerForm!: FormGroup

  //api variables
  private path: AuthService = inject(AuthService);
  private route: Router = inject(Router)
  isLoading = signal<boolean>(false)
  errorMsg = signal<string>("");
  subscribe:Subscription=new Subscription()
  

  ngOnInit(): void {

    this.registerInitForm();

  }

  //all data input and validation
  registerInitForm() {

    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]],
      rePassword: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]]
    }, { validators: this.matchValid });

  }

 

// custom validation if password != repassword
  matchValid(vGroup: AbstractControl) {

    if (vGroup.get('password')?.value === vGroup.get('rePassword')?.value) {
      return null
    } else {

      vGroup.get('rePassword')?.setErrors({ matchpassword: true })
      return { matchpassword: true };
    }

  }


  //when press submit
  regsterSubmit() {

    if (this.registerForm.valid) {

      this.register();

    } else {
      this.registerForm.markAllAsTouched()
    }

  }


  //send login data to api and loader
  register() {
    this.subscribe.unsubscribe();
    this.isLoading.set(true);
    this.subscribe =this.path.postDataRegister(this.registerForm.value).subscribe(
      {
        next: (res) => {
          console.log("register response", res);
          if (res.message == "success") {
            this.isLoading.set(false);
            this.route.navigate(["/login"]);
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


















