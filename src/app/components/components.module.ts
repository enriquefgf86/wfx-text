import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MyMapsModule } from './my-maps/my-maps.module';
import { TablesModule } from './tables/tables.module';
import { GraphicsModule } from './graphics/graphics.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    GraphicsModule,
    TablesModule,
    MyMapsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    DataTablesModule,GraphicsModule,
     NgxChartsModule 

  ],
  exports: [
    GraphicsModule,
    TablesModule,
    MyMapsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    DataTablesModule,
    NgxDatatableModule
  ],
})
export class ComponentsModule {}
