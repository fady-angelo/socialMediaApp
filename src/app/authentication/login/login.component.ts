import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = "";
  fireLogin: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl("", [Validators.required])
  })

  constructor(public _auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm);
    console.log(this.loginForm.controls?.["email"].value);
    this._auth.signIn(this.loginForm.controls?.["email"].value, this.loginForm.controls?.["password"].value)
  }

}
