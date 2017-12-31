import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppComponent } from './app.component';
import { LineChartComponent} from './components/charts/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { AnalyticsComponent } from './analytics/analytics.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppRoutingModule,routingComponents } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AnalyticsComponent,
    routingComponents 
  ],
  imports: [
    BrowserModule,
    ChartsModule,   
    AppRoutingModule,
    NgxGalleryModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent,LineChartComponent, GalleryComponent],
  entryComponents: [LineChartComponent]
})
export class AppModule { }
