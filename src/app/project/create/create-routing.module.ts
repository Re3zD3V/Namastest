import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePageProject } from './create.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePageProject
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePageRoutingModule {}
