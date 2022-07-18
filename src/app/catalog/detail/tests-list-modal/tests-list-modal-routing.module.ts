import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestsListModalPage } from './tests-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TestsListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestsListModalPageRoutingModule {}
