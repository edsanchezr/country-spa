import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable, tap, map } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const publicCanActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
                            state: RouterStateSnapshot) => {
  console.log('Can Match');
  console.log({route, state});
  return checkStatus ();
};

export const publicCanMatchGuard: CanMatchFn = (route: Route,
                        segments: UrlSegment []   ) => {
  console.log('Can Match');
  console.log({route, segments});
  return checkStatus ();
};

const checkStatus = (): boolean | Observable <boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
                .pipe(
                  tap ( isAuthenticated => {
                    if (isAuthenticated) router.navigate(['./']);
                  } ),
                  map ( isAuthenticated => !isAuthenticated)
                );

}
