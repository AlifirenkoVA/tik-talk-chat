import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private authService: AuthService;

  form = new FormGroup({
    username: new FormControl(null, {
      nonNullable: true,
      validators: [Validators.required]
  }),
    password: new FormControl(null, {
      nonNullable: true,
      validators: [Validators.required]
  }),
  })

  constructor(@Inject(AuthService) authService: AuthService,) { 
    this.authService = authService
  }

  onSubmit(event: Event) {
    if(this.form.valid && this.form.value.username && this.form.value.password){
      let respone = this.authService.login({username: this.form.value.username, 
        password: this.form.value.password}).subscribe(val => {
          console.log(val);
        });
    }
  }
}