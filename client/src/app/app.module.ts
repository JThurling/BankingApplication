import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SideNavComponent} from './shared/side-nav/side-nav.component';
import {AccountsComponent} from './dashboard/accounts/accounts.component';
import {TransfersComponent} from './dashboard/transfers/transfers.component';
import {HttpClientModule} from "@angular/common/http";
import {AccountDetailsComponent} from "./dashboard/account-details/account-details.component";
import {DashHomeComponent} from './shared/dash-home/dash-home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TransferHistoryComponent} from './dashboard/transfer-history/transfer-history.component';
import {TransferHistoryDetailsComponent} from './dashboard/transfer-history-details/transfer-history-details.component';
import {AccordionModule} from "ngx-bootstrap/accordion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CreateAccountComponent } from './dashboard/create-account/create-account.component';
import { DepositComponent } from './dashboard/deposit/deposit.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {ToastrModule} from "ngx-toastr";
import {SlideMenuModule} from "primeng/slidemenu";
import {SidebarModule} from "primeng/sidebar";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideNavComponent,
    AccountsComponent,
    TransfersComponent,
    AccountDetailsComponent,
    DashHomeComponent,
    TransferHistoryComponent,
    TransferHistoryDetailsComponent,
    CreateAccountComponent,
    DepositComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    SlideMenuModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
