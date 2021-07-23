import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Bankaccount} from "../../shared/models/bankaccount";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  Accounts: Bankaccount[];

  constructor(private dashService: DashboardService) { }

  ngOnInit(): void {
    this.dashService.getBankAccounts().subscribe(res => {
      this.Accounts = res;
    });
  }

  getCurrencyCode(currencyCode: string) {
    return this.dashService.getCurrencyCode(currencyCode);
  }
}
