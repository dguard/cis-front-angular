import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// FILTER
// LAYOUTS
import { AdminLayoutComponent } from '~modules/admin-layout/admin-layout.component';

// ROUTES
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'valutes',
        loadChildren: '~modules/valute/valute.module#ValuteModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

