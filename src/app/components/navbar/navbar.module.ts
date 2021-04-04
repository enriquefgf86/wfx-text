import { RouterModule } from '@angular/router';
import { NavbarRoutingModule } from './navbar-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    NavbarRoutingModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSidenavModule,
    MatChipsModule,
    MatListModule,
  ],
  exports: [
    MatToolbarModule,
    NavbarComponent,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSidenavModule,
    NavbarComponent,
    MatChipsModule,
    MatListModule,
  ],
})
export class NavbarModule {}
