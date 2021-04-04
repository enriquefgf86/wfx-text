import { MatChipsModule } from '@angular/material/chips';
import { Page3RoutingModule } from './page3-routing.module';
import { Page3Component } from './page3.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphicsModule } from 'src/app/components/graphics/graphics.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [Page3Component],
  imports: [
    CommonModule,
    RouterModule,
    Page3RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GraphicsModule,
    ChartsModule,
    MatChipsModule,
  ],
  exports: [Page3Component],
})
export class Page3Module {}
