import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceGuard } from "./module/auth/maintenance-guard/maintenance-guard.service";

const routes: Routes = [
  {
    path: 'messages',
    loadChildren: './module/messages/messages.module#MessagesModule',
    canActivate: [MaintenanceGuard],
    canLoad: [MaintenanceGuard],
    data: {maitenance: ['full']},
  },
  {
    path: '',
    loadChildren: './module/users/users.module#UsersModule',
    canActivate: [MaintenanceGuard],
    canLoad: [MaintenanceGuard],
    data: {maitenance: ['full']},
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        anchorScrolling: 'enabled',
        initialNavigation: 'enabled',
        scrollPositionRestoration: 'top',
        scrollOffset: [0, 90],
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
