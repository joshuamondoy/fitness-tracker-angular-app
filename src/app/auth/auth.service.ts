import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Injectable() // this is to inject routing service in this service
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) {}
    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSucessfull();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
       this.authSucessfull();
    }

    logout() {
        this.user = null;
        this.authChange.next(false)
        this.router.navigate(['/login'])
    }

    getUser() {
        return {...this.user}; // spread operator separates the values of the object into separate individual value so this will return a new object with the same key value pairs of object user
    }

    isAuth() {
        return this.user != null;
    }

    authSucessfull() {
        this.authChange.next(true)
        this.router.navigate(['/training']) 
    }
}