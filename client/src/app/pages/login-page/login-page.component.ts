import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private authService: AuthService;
  private router: Router;

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

  constructor(@Inject(AuthService) authService: AuthService,
  @Inject(Router) router: Router) { 
    this.authService = authService;
    this.router = router;
   }

  onSubmit(event: Event) {
    if(this.form.valid && this.form.value.username && this.form.value.password){
      return this.authService.login({username: this.form.value.username, 
        password: this.form.value.password}).subscribe(val => {
          this.router.navigate(['/']);
          console.log(typeof(event) + val);
        });
    }
    return null;
  }
}