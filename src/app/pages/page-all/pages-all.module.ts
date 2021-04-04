import { ComponentsModule } from './../../components/components.module';
import { PagesAllRoutingModule } from './pages-all-routing.module';
import { RouterModule } from '@angular/router';
import { PageAllComponent } from './page-all.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [PageAllComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule,
    PagesAllRoutingModule,
    ComponentsModule,
    MatSidenavModule,
  ],
  exports: [PageAllComponent, NavbarModule, MatSidenavModule],
})
export class PagesAllModule {}
