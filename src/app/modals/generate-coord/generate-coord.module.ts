import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerateCoordComponent } from './generate-coord.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [GenerateCoordComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [
    GenerateCoordComponent,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
})
export class GenerateCoordModule {}
