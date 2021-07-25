import {Component, HostListener, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {Transfers} from "../../shared/models/transfer";

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.scss']
})
export class TransferHistoryComponent implements OnInit {
  TransferList: Transfers[];
  isSmall: boolean = window.innerWidth < 768;

  constructor(private dashService: DashboardService) { }

  ngOnInit(): void {
    this.getTransferList();
  }

  getTransferList(){
    this.dashService.getTransferList().subscribe(res => {
      this.TransferList = res;
    });
  }

  getCurrencyCode(currencyCode: any) {
    return this.dashService.getCurrencyCode(currencyCode);
  }

  @HostListener('window:resize', ['$event'])
  View(event) {
    this.isSmall = event.target.innerWidth < 768;
  }
}
