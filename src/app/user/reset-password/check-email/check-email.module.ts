import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckEmailPageRoutingModule } from './check-email-routing.module';

import { CheckEmailPage } from './check-email.page';
import { HeaderModule } from 'src/app/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckEmailPageRoutingModule,
    HeaderModule
  ],
  declarations: [CheckEmailPage]
})
export class CheckEmailPageModule {}
