# Modular JSON config

## Define configuration for you module e.g.

auth.config.ts

    export interface AuthConfig {
      authMock: boolean;
      authUrl: string;
      authClientId: string;
      authClientSecret: string;
    }
    
auth.config.provider.ts

    import {InjectionToken} from '@angular/core';
    import {AuthConfig} from './auth-config';

    export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AuthConfig');

auth.config.validator.ts

    export function authConfigValidator(data: any): Error[] {
      const errors = [];
    
      if (!data.authUrl) {
        errors.push(new Error(`AUTH_CONFIG - property 'authUrl' is required`));
      }
    
      return errors;
    }

## Initialize FeConfigModule in your App

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        AuthModule.forRoot(),
        CoreModule.forRoot(),
        FeConfigModule.forRoot(
          'assets/config.json',
          [
            appConfigValidator, 
            authConfigValidator
          ]
        ),
      ],
      providers: [
        FeConfigModule.provide(APP_CONFIG),
        FeConfigModule.provide(AUTH_CONFIG)
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule {
    }


## Inject your config where needed

    @Injectable()
    export class AuthService implements Auth {
    
      constructor(@Inject(AUTH_CONFIG) private authConfig: AuthConfig) {
        console.log(authConfig.authUrl);
      }
    }


