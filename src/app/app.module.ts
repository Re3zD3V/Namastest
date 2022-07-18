import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProjectService } from './services/project.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { Routes, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from './shared/services/token/token-storage.service';
import { TokenDecoderService } from './shared/services/token/token-decoder.service';
import { ApiHttpClientInterceptor } from './shared/services/api/api-http-client-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    AuthService,
    ProjectService,
    CookieService,
    TokenStorageService,
    TokenDecoderService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpClientInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
