import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { UserAuthService } from '../../services/user-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginErrorMessage = "";
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  private readonly _userService = inject(UserService);
  private readonly _userAuthService = inject(UserAuthService);
  private readonly _router = inject(Router);

  login() {
    if (this.userForm.invalid) return;

    this._userService.login(this.userForm.value.email!, this.userForm.value.password!).subscribe({
      next: (response) => {
        console.log(response)
        this.loginErrorMessage = "";
        this._userAuthService.setUserToken(response.data.token);
        this._router.navigate(["/products"]);
      },
      error: (err) => {
        console.log(err)
        this.loginErrorMessage = err.error.message;
      }
    })
  }

}
