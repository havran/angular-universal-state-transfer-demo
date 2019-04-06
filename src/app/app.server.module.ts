import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CONFIG_SERVICE } from './module/core/service/config-access';
import { ServerConfigService } from './module/core/service/server-config.service';
import {CONFIG_URL, CONFIG_VALIDATORS, FeConfigModule} from "./module/config/config.module";
import {appConfigValidator} from "./config/app.config.validator";
import {APP_CONFIG} from "./config/app.config.token";
import {configFactory} from "./module/config/service/config.factory";
import {ConfigService} from "./module/config/service/config.service";
import {ConfigServerService} from "./module/config/service/config.server.service";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    FeConfigModule,
  ],
  providers: [
    // Add universal-only providers here
    { provide: CONFIG_SERVICE, useClass: ServerConfigService },

    {
      provide: CONFIG_URL,
      useValue: 'http://localhost:4000/assets/config/config.json',
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
    { provide: ConfigService, useClass: ConfigServerService },

  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule {}
