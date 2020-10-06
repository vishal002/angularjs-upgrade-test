import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';
import { NewPageComponent }  from './new-page/new-page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent
  // },
  {
    path: 'newpage',
    component: NewPageComponent
  },
  // { path: '',   redirectTo: '/newpage', pathMatch: 'full' },
  {
    path: '',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false, // <-- debugging purposes only
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
