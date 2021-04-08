import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Findeks } from '../models/findeks';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {
  apiUrl = "https://localhost:44352/api/"
  constructor(private httpClient:HttpClient) { }

  getUserFindeksPoint(id:number):Observable<ItemResponseModel<Findeks>>{
    let newPath = this.apiUrl+"findex/getfindexpoint?userId="+id;
    return this.httpClient.get<ItemResponseModel<Findeks>>(newPath);
  }
}
