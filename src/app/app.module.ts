import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NvdiComponent } from './nvdi/nvdi.component';
import { EsriLoaderService } from 'angular-esri-loader'; 
import { AngularEsriModule } from 'angular-esri-components';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  // { path: '', component: AppComponent },
  { path: 'ndvi', component: NvdiComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NvdiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularEsriModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [EsriLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
