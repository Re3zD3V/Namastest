import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddToCatalogModalPage } from './add-to-catalog-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddToCatalogModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddToCatalogModalPageRoutingModule {}
