import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AccountsComponent} from "./dashboard/accounts/accounts.component";
import {TransfersComponent} from "./dashboard/transfers/transfers.component";
import {AccountDetailsComponent} from "./dashboard/account-details/account-details.component";

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
      {path: 'account', component: AccountsComponent},
      {path: 'account/:accountNumber', component: AccountDetailsComponent},
      {path: 'transfers', component: TransfersComponent}
    ]},

  {path: '**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
