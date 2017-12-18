import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { MainHeaderComponent } from './components/comun/main-header/main-header.component';
import { MainFooterComponent } from './components/comun/main-footer/main-footer.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/home/form/form.component';
import { TableComponent } from './components/home/table/table.component';
import { ChartComponent } from './components/home/chart/chart.component';


const routes: Routes = [
  { path: '', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainFooterComponent,
    HomeComponent,
    FormComponent,
    TableComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
