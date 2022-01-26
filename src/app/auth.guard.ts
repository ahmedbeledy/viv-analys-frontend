import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TokenStorageService } from "./services/token-storage.service";
 

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private helperService: TokenStorageService
     ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ((this.helperService.getUserstate() ) )
   {

     return true;

   }
   else {
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })

     return false;
   }

  }
}

