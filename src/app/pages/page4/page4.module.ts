import { GraphicsModule } from './../../components/graphics/graphics.module';
import { MatChipsModule } from '@angular/material/chips';
import { MyMapsModule } from './../../components/my-maps/my-maps.module';
import { ComponentsModule } from './../../components/components.module';
import { Page4RoutingModule } from './page4-routing.module';
import { RouterModule } from '@angular/router';
import { Page4Component } from './page4.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [Page4Component],
  imports: [CommonModule, RouterModule, Page4RoutingModule,MatExpansionModule,ComponentsModule,MyMapsModule,MatChipsModule,GraphicsModule],
  exports: [Page4Component],
})
export class Page4Module {}
