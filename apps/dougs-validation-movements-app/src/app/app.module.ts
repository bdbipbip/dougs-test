import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { InputVisualiserComponent } from './components/input-visualiser/input-visualiser.component';
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {FormsModule} from "@angular/forms";
import { ValidationVisualiserComponent } from './components/validation-visualiser/validation-visualiser.component';

@NgModule({
  declarations: [AppComponent, InputVisualiserComponent, ValidationVisualiserComponent],
  imports: [BrowserModule, HttpClientModule, ButtonsModule.forRoot(), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
