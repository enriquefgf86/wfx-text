import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./pages/page-all/pages-all.module').then((module)=>module.PagesAllModule)
  },
  {
    path: '*',
    redirectTo: '/pages/page1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
