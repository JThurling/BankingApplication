import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {ActivatedRoute} from "@angular/router";
import {Bankaccount} from "../../shared/models/bankaccount";


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  Accounts: Bankaccount;

  constructor(private dashService: DashboardService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.dashService.getBankAccount(+this.router.snapshot.paramMap.get('accountNumber')).subscribe(res => {
      this.Accounts = res;
    });
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
