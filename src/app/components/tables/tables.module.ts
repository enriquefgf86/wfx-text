import { MatChipsModule } from '@angular/material/chips';
import { EditPostModule } from './../../modals/edit-post/edit-post.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [TablesComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    NgxDatatableModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    EditPostModule,
    MatChipsModule,
  ],
  exports: [
    TablesComponent,
    MatTableModule,
    NgxDatatableModule,
    DataTablesModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    EditPostModule,
    RouterModule,
    MatChipsModule
  ],
})
export class TablesModule {}
