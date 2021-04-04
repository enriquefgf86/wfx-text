import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MyMapsComponent } from './my-maps.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as mapboxgl from 'mapbox-gl';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [MyMapsComponent],
  imports: [CommonModule, RouterModule,MatChipsModule,MatExpansionModule],
  exports: [MyMapsComponent,MatExpansionModule],
})
export class MyMapsModule {

}
