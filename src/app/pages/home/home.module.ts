import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SlidesModule } from '../../modules/slides/slides.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DonationComponent } from './donation/donation.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SlidesModule,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [
      HomePage,
      ToolbarComponent,
      DonationComponent
    ]
})
export class HomePageModule {}
