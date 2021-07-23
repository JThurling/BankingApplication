import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bankaccount} from "../shared/models/bankaccount";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.apiUrl;


  constructor(private http: HttpClient) {
  }

  getBankAccounts(): Observable<Bankaccount[]> {
    return this.http.get<Bankaccount[]>(this.url + "banking").pipe();
  }

  getBankAccount(accountNumber: number): Observable<Bankaccount> {
    return this.http.get<Bankaccount>(this.url + "banking/" + `${accountNumber}`).pipe();
  }
}
