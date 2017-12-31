import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { LineChartComponent} from './components/charts/line-chart.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'line-chart' 
  //},
  {
    path: 'line-chart',
    component: LineChartComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [LineChartComponent, GalleryComponent];


