import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bankaccount} from "../shared/models/bankaccount";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Transfers} from "../shared/models/transfer";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.apiUrl;
  params = {};

  constructor(private http: HttpClient) {
  }

  getBankAccounts(): Observable<Bankaccount[]> {
    return this.http.get<Bankaccount[]>(this.url + "banking").pipe();
  }

  getBankAccount(accountNumber: number): Observable<Bankaccount> {
    return this.http.get<Bankaccount>(this.url + "banking/" + `${accountNumber}`).pipe();
  }

  setQueryParams(accountNumber: number, query: string){
    this.params[query] = accountNumber;
    return this.params;
  }

  clearParams(){
    this.params = {};
    return this.params;
  }

  transfer(value: Transfers){
    return this.http.post(this.url + 'transfer', value).pipe();
  }

  getCurrencyCode(code: string) {
    switch (code) {
      case "GBP":
        return "£ ";
      case "USD":
        return "$ ";
      case "ZAR":
        return "R ";
    }
  }
}
