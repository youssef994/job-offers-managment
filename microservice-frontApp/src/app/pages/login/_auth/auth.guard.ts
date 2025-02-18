import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';
import {AppAuthService} from '../_services/app-auth.service';
import {AppService} from '../_services/app.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private appAuthService: AppAuthService,
    private router: Router,
    private appService: AppService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    if (this.appAuthService.getToken() !== null) {
      const role = route.data['role'];
      const match = this.appService.roleMatch(role);
      if (match) {
        return true;
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }


}
