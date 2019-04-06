import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

import { ConfigValidator } from './config.validator';

export const CONFIG_KEY = makeStateKey<Object>('config');

@Injectable()
export class ConfigService {
  private _config: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private httpClient: HttpClient,
    private transferState: TransferState,
  ) {}

  get config(): any {
    return this._config;
  }

  load(configUrl: string, validators: ConfigValidator[]): Promise<any> {
    console.log('~~~> ConfigService#load: start');
    if (this.transferState.hasKey(CONFIG_KEY)) {
      this._config = this.transferState.get<Object>(CONFIG_KEY, {});
      this.transferState.remove(CONFIG_KEY);
      return Promise.resolve(true);
    }

    return this.httpClient
      .get(configUrl)
      .pipe(
        tap((response: Object) => {
          console.log('~~~> ConfigService#load: in http client response', response);
          this._config = response;
          this.validate(validators);
        }),
      )
      .toPromise();
  }

  validate(validators: ConfigValidator[]) {
    if (!this.config) {
      throw new Error(`CONFIG ERROR | config data is not defined!`);
    }

    validators
      .reduce((result: Error[], validator: Function) => {
        return result.concat(validator(this.config));
      }, [])
      .forEach((error: Error) => {
        error.message = `CONFIG ERROR | ${error.message}`;
        throw error;
      });
  }
}
