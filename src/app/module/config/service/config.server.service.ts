import { Injectable, Inject } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { ConfigValidator } from './config.validator';

export const CONFIG_KEY = makeStateKey<Object>('config');

@Injectable()
export class ConfigServerService {
  private _config: any;

  constructor(
    private transferState: TransferState,
  ) {}

  get config(): any {
    return this._config;
  }

  load(configUrl: string, validators: ConfigValidator[]): Promise<boolean> {
    const config = {};

    this._config = config;
    this.validate(validators);
    this.transferState.set(CONFIG_KEY, config);
    return Promise.resolve(true);
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
