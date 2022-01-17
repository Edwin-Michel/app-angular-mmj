import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { Temperature } from "./models/temperature.interface";


@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private url : string = 'https://smart-app-iot.herokuapp.com/mmj/api/v1.0/ph/';
  
  constructor(private http : HttpClient){}

 getAllTemps(): Observable<Temperature[]>{
    return this.http.get<Temperature[]>(this.url, {
      headers : {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Methods" : "GET",
        "Access-Control-Allow-Origin" : "*",
      }
    });
  }

  clearDataBase():void{
    //const urlClear = 'smart-app-iot.herokuapp.com/mmj/api/v1.0/temp/deleteAll/';
    const urlClear = 'https://smart-app-iot.herokuapp.com/mmj/api/v1.0/ph/deleteAll/';
    this.http.get(urlClear, {
      headers : {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Methods" : "GET",
        "Access-Control-Allow-Origin" : "*",
      }
    });
  }

  
  showMessage(message: string){
    console.log(message);
  }
}