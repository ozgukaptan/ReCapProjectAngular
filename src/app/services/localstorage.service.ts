import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  firstName: string = "firstName";
  lastName: string = "lastName";
  constructor() { }

  setLocalstorageToken(responseDataToken: string): void {
    localStorage.setItem("token", responseDataToken)
  }

  setLocalstorageFirstName(firstName: any) {
    localStorage.setItem(this.firstName, firstName)
  }

  setLocalstorageLastName(lastName: any) {
    localStorage.setItem(this.firstName, lastName)
  }

   getFirstName(): string {
     return localStorage.getItem(this.firstName) as string
   }

   getLastName(): string {
     return localStorage.getItem(this.lastName) as string
   }

}
