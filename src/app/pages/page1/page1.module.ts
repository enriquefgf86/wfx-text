import { TablesModule } from './../../components/tables/tables.module';
import { GenerateCoordModule } from './../../modals/generate-coord/generate-coord.module';
import { Page1RoutingModule } from './page1-routing.module';
import { Page1Component } from './page1.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [Page1Component],
  imports: [
    CommonModule,
    RouterModule,
    Page1RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    GenerateCoordModule,
    TablesModule,
    MatExpansionModule,MatSnackBarModule

  ],
  exports: [
    Page1Component,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    TablesModule
  ],
})
export class Page1Module {}
