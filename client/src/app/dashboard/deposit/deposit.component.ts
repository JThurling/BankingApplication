import {Component, HostListener, OnInit, TemplateRef} from '@angular/core';
import {Bankaccount} from "../../shared/models/bankaccount";
import {DashboardService} from "../dashboard.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  Accounts: Bankaccount[];
  modalRef: BsModalRef;
  account: Bankaccount;
  depositAmount: number = 0;
  loading: boolean = false;
  isSmall: boolean = window.innerWidth < 768;

  constructor(private dashService: DashboardService,  private modalService: BsModalService,
              private route: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.dashService.getBankAccounts().subscribe(res => {
      this.Accounts = res;
    });
  }

  getCurrencyCode(currencyCode: string) {
    return this.dashService.getCurrencyCode(currencyCode);
  }

  openDepositModal(account: Bankaccount, template: TemplateRef<any>) {
    this.account = account;
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  confirm() {
    this.loading = true;
    this.account.balance += this.depositAmount;
    this.dashService.depositMoney(this.account).subscribe(res => {
      this.loading = false;
      this.toast.success("Deposit Successful");
      this.decline();
      this.route.navigate(["/account"]);
    }, error => {
      this.toast.success("Deposit Unsuccessful");
      this.decline();
    });
  }

  decline() {
    this.depositAmount = 0;
    this.modalRef.hide();
  }

  @HostListener('window:resize', ['$event'])
  View(event) {
    this.isSmall = event.target.innerWidth < 768;
  }
}
