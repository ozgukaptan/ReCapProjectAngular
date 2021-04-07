import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

lastName:string;
firstName : string;

  constructor(private authService:AuthService , private localStorageService:LocalstorageService , private router:Router) { }

  ngOnInit(): void {
  }

  checkToLogin(){
    if(this.authService.isAuthenticated()){
      console.log(localStorage.getItem("firstName") + " string" )
      this.firstName = this.localStorageService.getFirstName();
      this.lastName = this.localStorageService.getLastName();
      return true;
    }else{
      return false;
    }
  }

  logout()
  {
    localStorage.clear();
    window.location.reload();
  }

}
