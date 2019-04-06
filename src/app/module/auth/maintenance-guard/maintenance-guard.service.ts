import {Inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { APP_CONFIG } from '../../../config/app.config.token';
import { AppConfig } from '../../../config/app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceGuard implements CanActivate, CanLoad {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private router: Router,
  ) {
    console.log('~~~> MaintenanceGuard#constructor - appConfig:', (this.appConfig ? 'OK - loaded' : 'ERROR - empty'));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {
    console.log('~~~> MaintenanceGuard#canActivate', route.data, state.url);
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log('~~~> MaintenanceGuard#canLoad', route.data, segments.join('/'));
    return true;
  }
}
