import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { CreateCampaignPageModule } from '../create/create.module';
import { FooterMenuModule } from 'src/app/footer-menu/footer-menu.module';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    CreateCampaignPageModule,
    HeaderModule,
    FooterMenuModule
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
