import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router){}
    canActivate() {
        if(this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']); // this will redirect user to login when accessing /training in the url if not authenticated 
        }
    }
}