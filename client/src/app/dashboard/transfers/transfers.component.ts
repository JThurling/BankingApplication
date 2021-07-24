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
  accountToNumber: number;
  accountFromNumber: number;


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
    if (this.From && this.dashService.selectedFrom == null)
      this.dashService.getBankAccount(+this.From).subscribe(res => {
        this.selectedFrom = res;
        this.dashService.setFrom(res);
      });
    else
      this.selectedFrom = this.dashService.selectedFrom;
  }

  getToAccount() {
    if (this.To && this.dashService.selectedTo == null)
      this.dashService.getBankAccount(+this.To).subscribe(res => {
        this.selectedTo = res;
        this.dashService.setTo(res);
      });
    else
      this.selectedTo = this.dashService.selectedTo;
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
    if (this.selectedCurrency === "USD") {
      if (this.selectedFrom.currencyCode === "GBP") return this.convertedAmount = amount * 0.73;
      if (this.selectedFrom.currencyCode === "ZAR") return this.convertedAmount = amount * 14.78;
    } else if (this.selectedCurrency === "GBP") {
      if (this.selectedFrom.currencyCode === "USD") return this.convertedAmount = amount * 1.37;
      if (this.selectedFrom.currencyCode === "ZAR") return this.convertedAmount = amount * 20.28;
    } else {
      if (this.selectedFrom.currencyCode === "GBP") return this.convertedAmount = amount * 0.049;
      if (this.selectedFrom.currencyCode === "USD") return this.convertedAmount = amount * 0.068;
    }
    return this.convertedAmount = amount;
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

  inputToAccount() {
    if (this.accountToNumber.toString().length === 8)
      this.toAccount();
  }

  toAccount() {
    this.dashService.getBankAccount(this.accountToNumber).subscribe(res => {
      this.selectedTo = res;
      this.dashService.setTo(res);
    });
  }

  inputFromAccount() {
    if (this.accountFromNumber.toString().length === 8)
      this.FromAccount();
  }

  FromAccount() {
    this.dashService.getBankAccount(this.accountFromNumber).subscribe(res => {
      this.selectedFrom = res;
      this.dashService.setFrom(res);
    });
  }
}
