import {Component, OnInit, TemplateRef} from '@angular/core';
import {Bankaccount} from "../../shared/models/bankaccount";
import {DashboardService} from "../dashboard.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Transfers} from "../../shared/models/transfer";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  From: string;
  To: string;
  selectedFrom: Bankaccount = null;
  selectedTo: Bankaccount = null;
  selectedCurrency: string = "GBP";
  amount: number;
  convertedAmount: number = 0;
  loading = false;
  modalRef: BsModalRef;


  constructor(private dashService: DashboardService, private router: ActivatedRoute,
              private route: Router, private modalService: BsModalService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getParams();
    this.getFromAccount();
    this.getToAccount();
  }

  getFromAccount() {
    if (this.From)
      this.dashService.getBankAccount(+this.From).subscribe(res => {
        this.selectedFrom = res;
      });
  }

  getToAccount() {
    if (this.To)
      this.dashService.getBankAccount(+this.To).subscribe(res => {
        this.selectedTo = res;
        console.log(this.selectedTo);
      });
  }

  private getParams() {
    this.router.queryParamMap.subscribe(q => {
      if (q.get('To')) this.To = q.get('To');
      if (q.get('From')) this.From = q.get('From');
    })
  }

  getCurrencyCode(code: string) {
    return this.dashService.getCurrencyCode(code);
  }

  calculateTotal(amount: number) {
    console.log(this.selectedCurrency, this.selectedFrom.currencyCode)
    if (this.selectedCurrency === "USD") {
      if (this.selectedFrom.currencyCode === "GBP") this.convertedAmount = amount * 0.73;
      if (this.selectedFrom.currencyCode === "ZAR") this.convertedAmount = amount * 14.78;
    } else if (this.selectedCurrency === "GBP") {
      if (this.selectedFrom.currencyCode === "USD") this.convertedAmount = amount * 1.37;
      if (this.selectedFrom.currencyCode === "ZAR") this.convertedAmount = amount * 20.28;
    } else {
      if (this.selectedFrom.currencyCode === "GBP") this.convertedAmount = amount * 0.049;
      if (this.selectedFrom.currencyCode === "USD") this.convertedAmount = amount * 0.068;
    }

    return amount

  }

  overdraft() {
    if (this.selectedFrom === null) return true;
    return this.convertedAmount > this.selectedFrom.balance;
  }

  clear(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }

  transfer(): Transfers {
    const transferData = new Transfers
    transferData.to = this.selectedTo.accountNumber
    transferData.from = this.selectedFrom.accountNumber
    transferData.amount = this.amount
    transferData.sortCode = this.selectedTo.sortCode
    transferData.currencyCode = this.selectedTo.currencyCode

    return transferData;
  }

  validateCurrency() {
    if (this.selectedTo !== null)
      return this.selectedCurrency !== this.selectedTo.currencyCode
  }

  validateTransfer() {
    return this.validateCurrency() || this.overdraft();
  }

  confirm() {
    this.loading = true;
    this.dashService.transfer(this.transfer()).subscribe(() => {
      this.dashService.clearParams();
      this.loading = true;
      this.selectedTo = null;
      this.selectedFrom = null;
      this.modalRef.hide();
      this.toast.success("Transfer Successful");
      this.route.navigate(['/account'], {queryParams: {To: null, From: null}, queryParamsHandling: 'merge'});
    }, error => {
      this.toast.error("Transfer Unsuccessful");
      this.decline();
    });
  }

  decline() {
    this.modalRef.hide();
  }
}
