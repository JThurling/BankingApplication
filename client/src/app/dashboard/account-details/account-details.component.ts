import {Component, OnInit, TemplateRef} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Bankaccount} from "../../shared/models/bankaccount";
import {HttpParams} from "@angular/common/http";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Currency} from "../../shared/models/currency";


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  Accounts: Bankaccount;
  accountTypes = ['Personal', 'Company', 'Other'];
  currencyCode = ['USD', 'GBP', 'ZAR'];
  createAccountForm: FormGroup;
  files: File[] = [];
  modalRef: BsModalRef;


  constructor(private dashService: DashboardService, private router: ActivatedRoute, private route: Router
    , private toast: ToastrService, private formBuilder: FormBuilder, private modalService: BsModalService,) {
  }

  ngOnInit(): void {
    this.dashService.getBankAccount(+this.router.snapshot.paramMap.get('accountNumber')).subscribe(res => {
      this.Accounts = res;
      this.accountForm();
    });
  }

  accountForm() {
    this.createAccountForm = this.formBuilder.group({
      fullname: [this.Accounts.fullName, [Validators.required]],
      accountType: [this.Accounts.accountType],
      addressLine1: [this.Accounts.addressLine1, [Validators.required]],
      city: [this.Accounts.city, [Validators.required]],
      postalCode: [this.Accounts.postalCode, [Validators.required]],
      balance: [this.Accounts.balance, [Validators.required]],
      currencyCode: [this.Accounts.currencyCode],
      attachments: [null]
    });
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

  uploadFile($event: Event) {
    const file = (event.target as HTMLInputElement).files;
    for (const fileKey in file) {
      if (fileKey === 'length') break;
      const upload = (event.target as HTMLInputElement).files[Number(fileKey)];
      if (upload !== undefined) this.files.push(upload);
    }
    this.createAccountForm.patchValue({
      attachments: this.files
    });
    this.createAccountForm.get('attachments').updateValueAndValidity();
  }

  onRemove(file: File) {
    const index = this.files.indexOf(file);
    if (index > -1) this.files.splice(index, 1);
  }

  getCurrencyCode(code: string): string {
    return this.dashService.getCurrencyCode(code);
  }

  onSubmit() {
    this.dashService.onUpdate(this.createAccountForm, this.Accounts).subscribe(res => {
      this.Accounts = res;
      this.toast.success("Update Successful");
      this.decline();
    }, error => {
      this.toast.success("Update Unsuccessful");
      this.decline();
    });
  }
  openDepositModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  confirm() {

  }

  decline() {
    this.modalRef.hide();
  }
}
