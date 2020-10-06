import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { PageNotFoundComponent }  from './page-not-found/page-not-found.component';
import { NewPageComponent }  from './new-page/new-page';

import { AppRoutingModule } from './app-routing.module';

declare var angular: angular.IAngularStatic;
import { setAngularJSGlobal } from '@angular/upgrade/static';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PopoverModule } from 'ngx-bootstrap/popover';

// setAngularJSGlobal(angular);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NewPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UpgradeModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    PopoverModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {}
}
