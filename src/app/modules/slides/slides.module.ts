import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides.component';

@NgModule({
    declarations: [
        SlidesComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        SlidesComponent
    ]
})
export class SlidesModule { }
