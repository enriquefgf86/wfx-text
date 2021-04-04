import { Page2RoutingModule } from './page2-routing.module';
import { Page2Component } from './page2.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TablesModule } from 'src/app/components/tables/tables.module';
import { GenerateCoordModule } from 'src/app/modals/generate-coord/generate-coord.module';



@NgModule({
  declarations: [Page2Component],
  imports: [
    CommonModule,RouterModule,Page2RoutingModule,FormsModule,ReactiveFormsModule, MatButtonModule,
    MatDialogModule,
    GenerateCoordModule,
    TablesModule,

  ],
  exports:[Page2Component]
})
export class Page2Module { }
