import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  userId: string = "userId";
  firstName: string = "firstName";
  lastName: string = "lastName";
  constructor() { }

  setLocalstorageToken(responseDataToken: string): void {
    localStorage.setItem("token", responseDataToken)
  }

  getLocalstorageToken(): string {
    return localStorage.getItem("token") as string
  }
  setLocalstorageUserId(userId: any) {
    localStorage.setItem(this.userId, userId)
  }

  setLocalstorageFirstName(firstName: any) {
    localStorage.setItem(this.firstName, firstName)
  }

  setLocalstorageLastName(lastName: any) {
    localStorage.setItem(this.lastName, lastName)
  }

  getUserId(): string {
    return localStorage.getItem(this.userId) as string
  }

   getFirstName(): string {
     return localStorage.getItem(this.firstName) as string
   }

   getLastName(): string {
     return localStorage.getItem(this.lastName) as string
   }

}
