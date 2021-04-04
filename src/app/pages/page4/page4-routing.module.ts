import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page4Component } from './page4.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: Page4Component }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class Page4RoutingModule {}
