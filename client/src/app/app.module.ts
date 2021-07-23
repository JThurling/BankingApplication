import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { AccountsComponent } from './dashboard/accounts/accounts.component';
import { TransfersComponent } from './dashboard/transfers/transfers.component';
import {HttpClientModule} from "@angular/common/http";
import {AccountDetailsComponent} from "./dashboard/account-details/account-details.component";
import { DashHomeComponent } from './shared/dash-home/dash-home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideNavComponent,
    AccountsComponent,
    TransfersComponent,
    AccountDetailsComponent,
    DashHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
