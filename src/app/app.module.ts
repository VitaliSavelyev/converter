import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainComponent} from "./main/main.component";
import {CurrenciesComponent} from "./routes/currencies/currencies.component";
import {CurrenciesService} from "./services/currencies.service";
import {FooterComponent} from "./footer/footer.component";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {TableComponent} from "./shared/table/table.component";
import {TableModule} from "primeng-lts/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { Provider } from '@angular/core';
import { ReqInterceptor } from './interceptors/req.interceptor';
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: ReqInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CurrenciesComponent,
    FooterComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule
  ],
  exports: [],
  providers: [INTERCEPTOR_PROVIDER, CurrenciesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
