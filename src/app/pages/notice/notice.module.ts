import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NoticePage } from './notice.page';
import { SlidesModule } from '../../modules/slides/slides.module';

const routes: Routes = [
  {
    path: '',
    component: NoticePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlidesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NoticePage]
})
export class NoticePageModule {}
