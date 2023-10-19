import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsPageComponent } from './requests-page/requests-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const routers: Routes = [
  { path: '', component: RequestsPageComponent },
]


@NgModule({
  declarations: [
    RequestsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routers)
  ],
  exports: [
    RequestsPageComponent
  ]
})
export class RequestsModule { }
