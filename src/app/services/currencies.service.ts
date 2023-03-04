import { Injectable } from '@angular/core';
import { Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CurrencyResp} from "../interfaces/interfaces";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor(private http: HttpClient) { }

  public getCurrencies(date?: string): Observable<CurrencyResp[]> {
    let params = new HttpParams();
    params = params.append('format', 'json');
    const url = date ? `/exchangerates/tables/A/${date}` : `/exchangerates/tables/A`
    return this.http.get<CurrencyResp[]>(url,  { params: params }).pipe(
      catchError(err => {
        return of(err)
      })
    )
  }
}
