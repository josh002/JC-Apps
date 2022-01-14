import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeisterTaskReaderPageRoutingModule } from './meister-task-reader-routing.module';

import { MeisterTaskReaderPage } from './meister-task-reader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeisterTaskReaderPageRoutingModule
  ],
  declarations: [MeisterTaskReaderPage]
})
export class MeisterTaskReaderPageModule {}
