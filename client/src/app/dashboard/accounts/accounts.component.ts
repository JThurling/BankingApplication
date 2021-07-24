import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Bankaccount} from "../../shared/models/bankaccount";
import {SearchSpecs} from "../../shared/models/specs";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  Accounts: Bankaccount[];
  search: string = null;
  accountNumber: number = null;

  constructor(private dashService: DashboardService) { }

  ngOnInit(): void {
    this.dashService.getBankAccounts().subscribe(res => {
      this.Accounts = res;
    });
  }

  getCurrencyCode(currencyCode: string) {
    return this.dashService.getCurrencyCode(currencyCode);
  }

  onSearch() {
    console.log("searching...")
    this.dashService.onSearch(this.search, this.accountNumber).subscribe(res => {
      this.Accounts = res;
    }, error => {
      console.log(error)
    });
  }
}
