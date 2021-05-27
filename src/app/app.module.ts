import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        NgxJsonViewerModule,
        Ng2SmartTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
