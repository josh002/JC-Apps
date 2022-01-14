import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeisterTaskReaderPage } from './meister-task-reader.page';

const routes: Routes = [
  {
    path: '',
    component: MeisterTaskReaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeisterTaskReaderPageRoutingModule {}
