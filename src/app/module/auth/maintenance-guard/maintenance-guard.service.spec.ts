import { TestBed, inject } from '@angular/core/testing';

import { MaintenanceGuard } from './maintenance-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG } from '../../../config/app.config.token';
import { appConfigMock } from '../../../config/app.config.mock';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { WINDOW } from '../../core/service/window/window.token';
import createSpyObj = jasmine.createSpyObj;

describe('AuthGuardService', () => {
  const windowMock = {
    location: {
      hostname: 'localhost',
    },
  };

  const activatedRouteSnapshotMock: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
  let routerStateSnapshotMock: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        MaintenanceGuard,
        { provide: APP_CONFIG, useValue: appConfigMock },
        { provide: WINDOW, useValue: windowMock },
      ],
    });

    routerStateSnapshotMock = createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', [
      'toString',
    ]);
  });

  it(
    'should ...',
    inject([MaintenanceGuard], (service: MaintenanceGuard) => {
      expect(service).toBeTruthy();
    }),
  );

  it(
    'should only allow maintenance page access',
    inject([MaintenanceGuard, Router], (service: MaintenanceGuard) => {
      activatedRouteSnapshotMock.data = { maitenance: ['full'] };
      const res = service.canActivate(activatedRouteSnapshotMock, routerStateSnapshotMock);
      expect(res.toString()).toEqual('/maintenance-mode');
    }),
  );

  it(
    'should allow user to crawl web pages',
    inject([MaintenanceGuard, Router], (service: MaintenanceGuard) => {
      activatedRouteSnapshotMock.data = { maitenance: [] };
      expect(service.canActivate(activatedRouteSnapshotMock, routerStateSnapshotMock)).toBeTruthy();
    }),
  );
});
