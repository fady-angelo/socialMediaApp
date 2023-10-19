import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReguestsComponent } from './reguests/reguests.component';
import { StoriesComponent } from './stories/stories.component';
import { SwiperModule } from 'swiper/angular';
import { CreatepostComponent } from './createpost/createpost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CreatePostFormComponent } from './create-post-form/create-post-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';




@NgModule({
  declarations: [
    SidebarComponent,
    ReguestsComponent,
    StoriesComponent,
    CreatepostComponent,
    CreatePostFormComponent,
  ],
  imports: [
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule,
    EmojiModule,
    CommonModule,
    RouterModule,
    ImageCropperModule
  ],
  exports: [
    SidebarComponent,
    ReguestsComponent,
    StoriesComponent,
    CreatepostComponent,
  ]
})
export class SharedModule { }
