import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44352/api/auth/";
  userId:number;

  constructor(private httpClient:HttpClient , private localStorageService:LocalstorageService) { }

  login(loginModel:LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  register(registerModel:RegisterModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"register",registerModel);
  }

  updateUser(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'UpdateUser';
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  // setUserId(){
  //   if (this.localStorageService.getLocalstorageToken()) {
  //     var decoded = this.jwtHelper.decodeToken(this.localStorageService.getLocalstorageToken());
  //     var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
  //     this.userId = Number(decoded[propUserId]);
  //   }
  // }

  // getUserId():number{
  //   return this.userId;
  //}
  
}
