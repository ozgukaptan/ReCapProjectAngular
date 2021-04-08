import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }
  pay(payment:Payment,rental:Rental):Observable<ResponseModel>{
    let path = environment.apiUrl+"Payments/Pay";
    return this.httpClient.post<ResponseModel>(path,{payment,rental})
  }

  saveCreditCard(creditCard:CreditCard) : Observable<ResponseModel>{
    let path = environment.apiUrl+"Payments/savecreditcard";
    return this.httpClient.post<ResponseModel>(path,creditCard);
  }

  getCreditCardsByUserId(userId:number) : Observable<ListResponseModel<CreditCard>>{
    let path = environment.apiUrl+"Payments/getcreditcardbyuserıd?userId="+userId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(path);
  }
}
