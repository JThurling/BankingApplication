import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AccountsComponent} from "./dashboard/accounts/accounts.component";
import {TransfersComponent} from "./dashboard/transfers/transfers.component";
import {AccountDetailsComponent} from "./dashboard/account-details/account-details.component";
import {TransferHistoryComponent} from "./dashboard/transfer-history/transfer-history.component";
import {TransferHistoryDetailsComponent} from "./dashboard/transfer-history-details/transfer-history-details.component";
import {DepositComponent} from "./dashboard/deposit/deposit.component";
import {CreateAccountComponent} from "./dashboard/create-account/create-account.component";

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
      {path: 'account', component: AccountsComponent},
      {path: 'account/:accountNumber', component: AccountDetailsComponent},
      {path: 'create', component: CreateAccountComponent},
      {path: 'deposit', component: DepositComponent},
      {path: 'transfers', component: TransfersComponent},
      {path: 'transfer-history', component: TransferHistoryComponent},
      {path: 'transfer-history/:id', component: TransferHistoryDetailsComponent},
    ]},
  {path: '**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
