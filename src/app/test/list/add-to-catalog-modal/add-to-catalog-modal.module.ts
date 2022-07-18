import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddToCatalogModalPageRoutingModule } from './add-to-catalog-modal-routing.module';

import { AddToCatalogModalPage } from './add-to-catalog-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddToCatalogModalPageRoutingModule
  ],
  declarations: [AddToCatalogModalPage],
  exports: [AddToCatalogModalPage]
})
export class AddToCatalogModalPageModule {}
