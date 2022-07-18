import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { CreatePageModule } from 'src/app/test/create/create.module';
import { TestsListModalPageModule } from './tests-list-modal/tests-list-modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    CreatePageModule,
    TestsListModalPageModule
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
