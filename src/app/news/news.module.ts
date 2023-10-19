import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsPageComponent } from './news-page/news-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NewsCardComponent } from './news-card/news-card.component';


@NgModule({
  declarations: [
    NewsPageComponent,
    NewsCardComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    HttpClientModule
  ]
})
export class NewsModule { }
