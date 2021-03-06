import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car, CarDetail } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = "https://localhost:44352/api/"
  constructor(private httpClient: HttpClient) { }

  getCar(id:number):Observable<ItemResponseModel<CarDetail>>{
    let newPath = this.apiUrl+"cars/getbyid?id="+id;
    return this.httpClient.get<ItemResponseModel<CarDetail>>(newPath);
  }
}
