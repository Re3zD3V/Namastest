import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { CreatePageModule } from '../create/create.module';
import { AddToCatalogModalPageModule } from './add-to-catalog-modal/add-to-catalog-modal.module';
import { FooterMenuModule } from 'src/app/footer-menu/footer-menu.module';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    ListPageRoutingModule, 
    CreatePageModule, 
    AddToCatalogModalPageModule, 
    FooterMenuModule,
    HeaderModule
  ],
  declarations: [ListPage],
})
export class ListPageModule {}
