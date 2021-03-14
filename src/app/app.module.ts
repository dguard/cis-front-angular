import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '~utils/shared.module';

import { AppRoutingModule } from '~app/app.routes';

import { AppComponent } from '~components/app/app.component';

import { AdminLayoutModule } from '~modules/admin-layout/admin-layout.module';
import {WebsocketService} from '~services/websocket.service';
import {ValuteService} from '~services/valute.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AdminLayoutModule,
  ],
  providers: [
    ValuteService,
    WebsocketService
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
