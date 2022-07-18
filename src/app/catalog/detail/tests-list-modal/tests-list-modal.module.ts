import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestsListModalPageRoutingModule } from './tests-list-modal-routing.module';

import { TestsListModalPage } from './tests-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestsListModalPageRoutingModule
  ],
  declarations: [TestsListModalPage],
  exports: [TestsListModalPage]
})
export class TestsListModalPageModule {}
