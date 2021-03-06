import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCampaignPageRoutingModule } from './create-routing.module';

import { CreateCampaignPage } from './create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCampaignPageRoutingModule
  ],
  declarations: [CreateCampaignPage]
})
export class CreateCampaignPageModule {}
