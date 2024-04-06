import { Injectable } from "@angular/core";
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map } from 'rxjs/operators';
import { inject } from "@angular/core";
@Injectable({
  providedIn: "root",
})
class PermissionsService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.isUserLoggedIn$.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return this.router.createUrlTree(["signup"]);
        }
        return true;
      })
    );
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
  return inject(PermissionsService).canActivate(next, state);
}
