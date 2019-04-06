import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { ConfigServerService } from './config.server.service';
import { CONFIG_KEY } from './config.service';
import { appConfigMock } from '../../../config/app.config.mock';

describe('ConfigServerService', () => {
  describe('when rendering on the server', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          ConfigServerService,
          TransferState,
        ],
      });
    });

    it(
      'should be created',
      inject([ConfigServerService], (service: ConfigServerService) => {
        expect(service).toBeTruthy();
      }),
    );

    it(
      'given a values from process env, should set transfer state and return config',
      inject(
        [ConfigServerService, TransferState],
        (service: ConfigServerService, transferState: TransferState) => {
          // Arrange
          const setStateSpy = spyOn(transferState, 'set').and.callThrough();

          // Act
          service.load('', []);
          const actualResult = service.config;

          // Assert
          expect(actualResult).toEqual(appConfigMock);
          expect(setStateSpy).toHaveBeenCalledWith(CONFIG_KEY, actualResult);
        },
      ),
    );
  });
});
