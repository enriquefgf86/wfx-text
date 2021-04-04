import { PostEffects } from './redux/postEffects.effects';
import { ModalsModule } from './modals/modals.module';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { Page4Module } from './pages/page4/page4.module';
import { PagesAllModule } from './pages/page-all/pages-all.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { Page3Module } from './pages/page3/page3.module';
import { Page2Module } from './pages/page2/page2.module';
import { Page1Module } from './pages/page1/page1.module';
import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageAllComponent } from './pages/page-all/page-all.component';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { globalReducer } from './globalReducers.reducers';
import { environment } from 'src/environments/environment';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EffectsModule } from '@ngrx/effects';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    ChartsModule ,
    ComponentsModule,
    NavbarModule,
    ModalsModule,
    Page1Module,
    Page2Module,
    Page3Module,
    Page4Module,
    PagesAllModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatSidenavModule,
    MatChipsModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatDialogModule,
    DataTablesModule,
    HttpClientModule,
    NgxDatatableModule,
    NgxChartsModule,
    StoreModule.forRoot(globalReducer, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot([PostEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
