import { EditPostModule } from './edit-post/edit-post.module';
import { GenerateCoordModule } from './generate-coord/generate-coord.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    GenerateCoordModule,
    EditPostModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    GenerateCoordModule,
    EditPostModule,
  ],
})
export class ModalsModule {}
