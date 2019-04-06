import { TestBed, async, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransferState } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID } from '@angular/common';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';

import { ConfigService, CONFIG_KEY } from './config.service';
import { ConfigHttpInterceptor } from '../testing/config-http-interceptor';
import { CONFIG_FIXTURE } from '../testing/config-mock';
import { FakeHttp } from '../testing/fake-http';

const mockValidator = (data: any): Error[] => {
  const errors = [];
  if (!data.expectedConfigProperty) {
    errors.push(new Error(`property 'expectedConfigProperty' is missing in the config`));
  }
  return errors;
};

describe('ConfigService', () => {
  describe('when rendering in the browser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          ConfigService,
          {
            provide: HTTP_INTERCEPTORS,
            useClass: ConfigHttpInterceptor,
            multi: true,
          },
          TransferState,
        ],
      });
    });

    it(
      'should be created',
      inject([ConfigService], (service: ConfigService) => {
        expect(service).toBeTruthy();
      }),
    );

    it(
      'should load JSON config',
      async(
        inject([ConfigService], (service: ConfigService) => {
          service.load('/assets/config/mock-config.json', []).then(() => {
            expect(service.config).toBeDefined();
            expect(service.config.apiUrl).toBeDefined();
            expect(service.config.apiUrl).toBe(CONFIG_FIXTURE.apiUrl);
          });
        }),
      ),
    );

    it(
      'should throw an error when config validation fails',
      async(
        inject([ConfigService], (service: ConfigService) => {
          service
            .load('/assets/config/mock-config.json', [mockValidator])
            .then(() => {
              fail('A validation error was expected...');
            })
            .catch((error: any) => {
              expect(typeof error).toBe(`object`);
              expect(error.hasOwnProperty('message')).toBe(true);
            });
        }),
      ),
    );

    it(
      'should get config from transfer state store',
      inject(
        [ConfigService, TransferState],
        (service: ConfigService, transferState: TransferState) => {
          // Arrange
          transferState.hasKey(CONFIG_KEY);
          transferState.set(CONFIG_KEY, CONFIG_FIXTURE);
          const getStateSpy = spyOn(transferState, 'get').and.callThrough();
          const setStateSpy = spyOn(transferState, 'set').and.callThrough();
          let results: object = {};

          // Act
          service.load('/assets/config/mock-config.json', [mockValidator]);
          results = service.config;

          // Assert
          expect(results).toEqual(CONFIG_FIXTURE);
          expect(setStateSpy).toHaveBeenCalledTimes(0);
          expect(getStateSpy).toHaveBeenCalledTimes(1);
        },
      ),
    );
  });
});
