import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./module/auth/auth.module";
import { CoreModule } from './module/core/core.module';
import {APP_CONFIG} from "./config/app.config.token";
import {appConfigValidator} from "./config/app.config.validator";
import {CONFIG_URL, CONFIG_VALIDATORS, FeConfigModule} from "./module/config/config.module";
import {configFactory} from "./module/config/service/config.factory";
import {ConfigService} from "./module/config/service/config.service";
import { CONFIG_SERVICE, ConfigAccess } from './module/core/service/config-access';
import { BrowserConfigService } from './module/core/service/browser-config.service';
import { AUTH_CONFIG } from "./module/auth/config/auth-config.token";

// export function configFactory(configService: ConfigAccess) {
//   return () => configService.init();
// }


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    CoreModule.forRoot(),
    FeConfigModule,
  ],
  providers: [
    // { provide: CONFIG_SERVICE, useClass: BrowserConfigService },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: configFactory,
    //   deps: [
    //     [new Inject(CONFIG_SERVICE)]
    //   ],
    //   multi: true,
    // },

    {
      provide: CONFIG_URL,
      useValue: '/assets/config/config.json',
    },
    {
      provide: CONFIG_VALIDATORS,
      useValue: [appConfigValidator],
    },
    {
      provide: APP_CONFIG,
      useFactory: configFactory,
      deps: [ConfigService],
    },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
