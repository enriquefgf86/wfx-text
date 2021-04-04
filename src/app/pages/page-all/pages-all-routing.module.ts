import { NavbarComponent } from './../../components/navbar/navbar.component';
import { PageAllComponent } from './page-all.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'pages',
    component: PageAllComponent,
    children: [
      {
        path: '',
        component: NavbarComponent,
      },
      {
        path: 'page1',
        loadChildren: () =>
          import('../page1/page1.module').then((module) => module.Page1Module),
      },
      {
        path: 'page2',
        loadChildren: () =>
          import('../page2/page2.module').then((module) => module.Page2Module),
      },
      {
        path: 'page3',
        loadChildren: () =>
          import('../page3/page3.module').then((module) => module.Page3Module),
      },
      {
        path: 'page4/:id',
        loadChildren: () =>
          import('../page4/page4.module').then((module) => module.Page4Module),
      },
    ],
  },
  {
    path: '*',
    redirectTo: '/pages/page1',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesAllRoutingModule {}
