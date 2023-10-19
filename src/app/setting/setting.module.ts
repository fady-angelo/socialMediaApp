import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting/setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';
import { AppRoutingModule } from '../app-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from '../shared/shared.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AccountComponent } from './account/account.component';
import { NotificationComponent } from './notification/notification.component';
import { SecuretyComponent } from './securety/securety.component';



@NgModule({
  declarations: [
    SettingComponent,
    AccountComponent,
    NotificationComponent,
    SecuretyComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    SharedModule,
    NgxIntlTelInputModule,
  ]
})
export class SettingModule { }
