import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    
    constructor(private authService: AuthService, 
                private router: Router,
                private store: Store<fromRoot.State>){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if(this.authService.isAuth()) {
        //     return true;
        // } else {
        //     this.router.navigate(['/login']); // this will redirect user to login when accessing /training in the url if not authenticated 
        // }
        return this.store.select(fromRoot.getIsAuth);
    }
    canLoad(route: Route) {
        // if(this.authService.isAuth()) {
        //     return true;
        // } else {
        //     this.router.navigate(['/login']); // this will redirect user to login when accessing /training in the url if not authenticated 
        // } 
        return this.store.select(fromRoot.getIsAuth);

    }
}