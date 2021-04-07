import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44352/api/users/"

  constructor(private httpClient: HttpClient) { }

  getByEmail(email: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
