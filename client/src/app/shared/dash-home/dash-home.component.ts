import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../dashboard/dashboard.service";
import {Currency} from "../models/currency";
import {Bankaccount} from "../models/bankaccount";

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.scss']
})
export class DashHomeComponent implements OnInit {
  currency: Currency;
  Accounts: Bankaccount[];

  constructor(private dashService: DashboardService) { }

  ngOnInit(): void {
    this.dashService.getBankAccounts().subscribe(res => {
      this.Accounts = res;
    });
    this.dashService.getCurrency().subscribe(res => {
      this.currency = res;
    });
  }

}
