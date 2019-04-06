import { APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { Optional, Inject, SkipSelf, Provider } from '@angular/core';
import { ConfigService } from './service/config.service';
import { ConfigValidator } from './service/config.validator';
import { configServiceFactory } from './service/config.service.factory';
import { configFactory } from './service/config.factory';

export const CONFIG_URL = new InjectionToken<string>('CONFIG_URL');
export const CONFIG_VALIDATORS = new InjectionToken<string>('CONFIG_VALIDATORS');

const providers: Provider[] = [
  ConfigService,
  {
    provide: CONFIG_URL,
    useValue: '',
  },
  {
    provide: CONFIG_VALIDATORS,
    useValue: [],
  },
  {
    provide: APP_INITIALIZER,
    useFactory: configServiceFactory,
    deps: [ConfigService, [new Inject(CONFIG_URL)], [new Inject(CONFIG_VALIDATORS)]],
    multi: true,
  },
];

@NgModule({
  imports: [],
  providers,
  declarations: [],
})
export class FeConfigModule {
  /**
   * Initialize FeConfigModule for root in AppModule imports, pass config URL and array of config validator functions
   */
  static forRoot<T>(configUrl: string, validators: ConfigValidator[] = []): ModuleWithProviders {
    return {
      ngModule: FeConfigModule,
      providers: [
        ConfigService,
        {
          provide: CONFIG_URL,
          useValue: configUrl ? configUrl : '',
        },
        {
          provide: CONFIG_VALIDATORS,
          useValue: validators ? validators : [],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: configServiceFactory,
          deps: [ConfigService, [new Inject(CONFIG_URL)], [new Inject(CONFIG_VALIDATORS)]],
          multi: true,
        },
      ],
    };
  }

  /**
   * Create provider for each module config in AppModule providers
   */
  static provide(type: any): Provider {
    return {
      provide: type,
      useFactory: configFactory,
      deps: [ConfigService],
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: FeConfigModule,
  ) {
    if (parentModule) {
      throw new Error('FeConfigModule is already loaded. Import it in the AppModule only');
    }
  }
}
