import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Bankaccount} from "../../shared/models/bankaccount";
import {HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  Accounts: Bankaccount;

  constructor(private dashService: DashboardService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.dashService.getBankAccount(+this.router.snapshot.paramMap.get('accountNumber')).subscribe(res => {
      this.Accounts = res;
    });
  }

  getCurrencyCode(code: string) {
    return this.dashService.getCurrencyCode(code);
  }

  setToQueryParam(accountNumber: number) {
    var params = this.dashService.setQueryParams(accountNumber, 'To');
    this.route.navigate(["/transfers"],
      {queryParams: params});
  }

  setFromQueryParam(accountNumber: number) {
    var params = this.dashService.setQueryParams(accountNumber, 'From');
    this.route.navigate(["/transfers"],
      {queryParams: params});
  }
}
