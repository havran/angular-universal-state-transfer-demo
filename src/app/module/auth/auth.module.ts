import { ModuleWithProviders, NgModule, Optional, Provider, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceGuard } from "./maintenance-guard/maintenance-guard.service";

const AUTH_MODULE_PROVIDERS: Provider[] = [
  MaintenanceGuard,
];

@NgModule({
  imports: [CommonModule],
  providers: AUTH_MODULE_PROVIDERS,
  declarations: [],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: AUTH_MODULE_PROVIDERS,
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AuthModule,
  ) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import it in the AppModule only');
    }
  }
}
