import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService
    , private toastrService: ToastrService
    , private localStorageService: LocalstorageService
    , private userService: UserService
    , private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe(response => {
        this.router.navigate(["cars"]);
        this.toastrService.info(response.message)
        this.localStorageService.setLocalstorageToken(response.data.token)
        this.setLocalstorage(this.loginForm.value.email)
        console.log(response)
      })
    }
  }

  setLocalstorage(email: string) {
    this.userService.getByEmail(email).subscribe(response => {
      this.localStorageService.setLocalstorageFirstName(response.data.firstName);
      console.log(localStorage.getItem("firstName"))
      
       this.localStorageService.setLocalstorageLastName(response.data.lastName);
       
    })

  }

}
