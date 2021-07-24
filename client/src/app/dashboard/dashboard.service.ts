import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Bankaccount} from "../shared/models/bankaccount";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Transfers} from "../shared/models/transfer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchSpecs} from "../shared/models/specs";
import {Currency} from "../shared/models/currency";
import {Postcodes} from "../shared/models/Postcodes";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = environment.apiUrl;
  params = {};
  accountForm: FormGroup = this.formbuilder.group({});
  searchSpecs: SearchSpecs;
  selectedFrom: Bankaccount = null;
  selectedTo: Bankaccount = null;

  constructor(private http: HttpClient, private formbuilder: FormBuilder) {
  }

  getBankAccounts(): Observable<Bankaccount[]> {
    return this.http.get<Bankaccount[]>(this.url + "banking").pipe();
  }

  getBankAccount(accountNumber: number): Observable<Bankaccount> {
    return this.http.get<Bankaccount>(this.url + "banking/" + `${accountNumber}`).pipe();
  }

  setQueryParams(accountNumber: number, query: string) {
    this.params[query] = accountNumber;
    return this.params;
  }

  clearParams() {
    this.params = {};
    this.selectedFrom = null;
    this.selectedTo = null;
    return this.params;
  }

  setParams(acc1: number, acc2: number){
    this.params['To'] = acc1;
    this.params['From'] = acc2;
    return this.params;
  }

  transfer(value: Transfers) {
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

  getTransferList(): Observable<Transfers[]> {
    return this.http.get<Transfers[]>(this.url + "transfer").pipe()
  }

  getTransfer(id: string): Observable<Transfers> {
    return this.http.get<Transfers>(this.url + "transfer/" + id).pipe()
  }

  depositMoney(account: Bankaccount) {
    return this.http.post(this.url + "banking/deposit/" + account.id, account).pipe();
  }

  onSubmit(form: FormGroup): Observable<Bankaccount> {
    this.accountForm = form;
    const formData = new FormData();
    formData.append('fullname', this.accountForm.get('fullname').value);
    formData.append('accountType', this.accountForm.get('accountType').value);
    formData.append('addressLine1', this.accountForm.get('addressLine1').value);
    formData.append('city', this.accountForm.get('city').value);
    formData.append('postalCode', this.accountForm.get('postalCode').value);
    formData.append('balance', this.accountForm.get('balance').value);
    formData.append('currencyCode', this.accountForm.get('currencyCode').value);
    if (this.accountForm.get('attachments').value)
      Array.from(this.accountForm.get('attachments').value).map((file: File) => {
        formData.append('attachments', file, file.name);
      });


    return this.http.post<Bankaccount>(this.url + 'banking', formData).pipe();
  }

  onUpdate(form: FormGroup, account: Bankaccount) {
    this.accountForm = form;
    const formData = new FormData();
    formData.append('fullname', this.accountForm.get('fullname').value);
    formData.append('accountType', this.accountForm.get('accountType').value);
    formData.append('addressLine1', this.accountForm.get('addressLine1').value);
    formData.append('city', this.accountForm.get('city').value);
    formData.append('balance', this.accountForm.get('balance').value);
    formData.append('currencyCode', this.accountForm.get('currencyCode').value);
    formData.append('postalCode', this.accountForm.get('postalCode').value);
    if (this.accountForm.get('attachments').value)
      Array.from(this.accountForm.get('attachments').value).map((file: File) => {
        formData.append('attachments', file, file.name);
      });


    return this.http.post<Bankaccount>(this.url + 'banking/personal/' + account.id, formData).pipe();
  }

  onSearch(search: string, accountNumber: number) {
    let queryParams = new HttpParams();
    if (search) {
      queryParams = queryParams.set('search', search);
    }
    if (accountNumber) {
      queryParams = queryParams.set('account', accountNumber.toString());
    }

    return this.http.get<Bankaccount[]>(this.url + "banking", {params: queryParams}).pipe();
  }

  setFrom(res: Bankaccount) {
    this.selectedFrom = res;
  }

  setTo(res: Bankaccount) {
    this.selectedTo = res;
  }

  getCurrency(){
    return this.http.get<Currency>('	https://openexchangerates.org/api/latest.json?app_id=684e0a2c071241f7af108d9cf47f507a&base=USD&symbols=ZAR%2CGBP').pipe();
  }

  getPostAddress(code: string) {
    return this.http.get<Postcodes>('http://api.postcodes.io/postcodes/' + code).pipe();
  }
}
