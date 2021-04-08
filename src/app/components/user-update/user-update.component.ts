import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userUpdateForm: FormGroup;

  userId: number = + this.cookieService.get('userId');
  //userId : number =  this.authService.userId
  user: User;
  dataLoaded = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private cookieService: CookieService, private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUser();
    this.createUserUpdateForm();

  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  getUser() {

    this.userService.getById(this.userId).subscribe(response => {
      this.user = response.data;
      this.dataLoaded = true;
      this.userUpdateForm.patchValue(response.data);
    })

  }

  updateUser() {
    if (this.userUpdateForm.valid) {
      let userModal = Object.assign({ id: this.user.id }, this.userUpdateForm.value)
      this.authService.updateUser(userModal).subscribe(response => {
        this.toastrService.success(response.message);
      }, errorResponse => {
        this.toastrService.error(errorResponse.error, "Error")
      }
      )
    }
  }

}
