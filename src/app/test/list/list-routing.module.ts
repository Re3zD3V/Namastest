import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPage } from './list.page';

const routes: Routes = [
  {
    path: '',
    component: ListPage
  },  {
    path: 'add-to-catalog-modal',
    loadChildren: () => import('./add-to-catalog-modal/add-to-catalog-modal.module').then( m => m.AddToCatalogModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPageRoutingModule {}
