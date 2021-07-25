import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DashboardService} from "../dashboard.service";
import {ToastrService} from "ngx-toastr";
import {Postcodes} from "../../shared/models/Postcodes";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  accountTypes = ['Personal', 'Company', 'Other'];
  currencyCode = ['USD', 'GBP', 'ZAR'];
  createAccountForm: FormGroup;
  files: File[] = [];
  Address: Postcodes = null;
  loading = false;

  constructor(private formBuilder: FormBuilder, private dashService: DashboardService
              ,private toast: ToastrService) { }

  ngOnInit(): void {
    this.accountForm();
  }

  accountForm(){
    this.createAccountForm = this.formBuilder.group({
      fullname: [null, [Validators.required]],
      accountType: [this.accountTypes[0]],
      addressLine1: [null, [Validators.required]],
      city: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      balance: [null, [Validators.required, ValidateAmount]],
      currencyCode: [this.currencyCode[0]],
      attachments: [null]
    });
    function ValidateAmount(control: AbstractControl): {[key: string]: any} | null {
      if (control.value <= 100) return {"invalidAmount" : true}
      return null;
    }
  }

  createAccount() {
    console.log()
  }

  uploadFile($event: Event) {
    const file = (event.target as HTMLInputElement).files;
    for(const fileKey in file) {
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

  getCurrencyCode(code: string): string{
    return this.dashService.getCurrencyCode(code);
  }

  onSubmit() {
    this.loading = true;
    this.dashService.onSubmit(this.createAccountForm).subscribe(res => {
      this.loading = false;
      this.toast.success("Created Account");
    }, error => {
      this.loading = false;
      this.toast.error("There was an error: \n Please check if account exists");
    });
  }

  getPostData(post: HTMLInputElement) {
    this.dashService.getPostAddress(post.value).subscribe(res => {
      this.Address = res;
    }, error => {
      this.toast.error("Not Found");
    });
  }
}
