import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  

  userId: string = "userId";
  firstName: string = "firstName";
  lastName: string = "lastName";
  constructor(private cookieService:CookieService) { }

 

  setLocalstorageFirstName() {
    
  }
}
