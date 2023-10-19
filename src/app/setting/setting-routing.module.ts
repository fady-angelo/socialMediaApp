import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { NotificationComponent } from './notification/notification.component';
import { SecuretyComponent } from './securety/securety.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: '', component: SettingComponent, children: [
      { path: '', redirectTo: 'account', pathMatch: "full" },
      { path: 'account', component: AccountComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'securety', component: SecuretyComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
