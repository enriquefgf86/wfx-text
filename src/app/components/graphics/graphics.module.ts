import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { GraphicsComponent } from './graphics.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [GraphicsComponent],
  imports: [CommonModule, RouterModule,MatSnackBarModule,NgxChartsModule,ChartsModule,MatChipsModule
   ],
  exports: [GraphicsComponent],
})
export class GraphicsModule {}
