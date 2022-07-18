import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { CreatePageModule } from '../test/create/create.module';
import { CreatePageCatalogModule } from '../catalog/create/create.module';
import { CreateProjectPageModule } from '../project/create/create.module';
import { FooterMenuModule } from '../footer-menu/footer-menu.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    DashboardPageRoutingModule, 
    CreatePageModule, 
    CreatePageCatalogModule, 
    CreateProjectPageModule, 
    FooterMenuModule,
    HeaderModule
  ],
  declarations: [
    DashboardPage
  ],
})
export class DashboardPageModule {}
