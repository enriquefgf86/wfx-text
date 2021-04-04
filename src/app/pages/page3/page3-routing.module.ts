import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Page3Component } from './page3.component';

const routes: Routes = [
  {
    path: '',
    component: Page3Component,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class Page3RoutingModule {}
