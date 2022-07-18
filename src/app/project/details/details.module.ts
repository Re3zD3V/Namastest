import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { DeleteComponent } from '../delete/delete.component';
import { CreateCampaignPageModule } from 'src/app/campaign/create/create.module';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    CreateCampaignPageModule,
    HeaderModule
  ],
  declarations: [
    DetailsPage, 
    DeleteComponent
  ]
})
export class DetailsPageModule {}
