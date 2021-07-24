import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Transfers} from "../../shared/models/transfer";
import {Bankaccount} from "../../shared/models/bankaccount";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-transfer-history-details',
  templateUrl: './transfer-history-details.component.html',
  styleUrls: ['./transfer-history-details.component.scss']
})
export class TransferHistoryDetailsComponent implements OnInit {
  Transfer: Transfers;
  selectedFrom: Bankaccount = null;
  selectedTo: Bankaccount = null;

  constructor(private dashService: DashboardService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTransfer();
  }

  getFromAccount() {
      this.dashService.getBankAccount(+this.Transfer.from).subscribe(res => {
        this.selectedFrom = res;
      });
  }

  getToAccount() {
      this.dashService.getBankAccount(+this.Transfer.to).subscribe(res => {
        this.selectedTo = res;
        console.log(this.selectedTo);
      });
  }

  getTransfer(){
    this.dashService.getTransfer(this.router.snapshot.paramMap.get('id')).subscribe(res => {
      this.Transfer = res;
      this.getFromAccount();
      this.getToAccount();
    });
  }

  getCurrencyCode(currencyCode: any) {
    return this.dashService.getCurrencyCode(currencyCode);
  }
}
