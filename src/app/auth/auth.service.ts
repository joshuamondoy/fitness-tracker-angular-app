import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UIService } from "../shared/ui.service";
import { TrainingService } from "../training/training.sevice";

@Injectable() // this is to inject routing service in this service
export class AuthService {
    authChange = new Subject<boolean>();
    userEmail = new Subject<string>();
    private isAuthenticated: boolean = false;

    constructor(private router: Router, 
                private afAuth: AngularFireAuth,
                private uiService: UIService,
                private trainingService: TrainingService) {}
    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.isAuthenticated = true;
                this.authChange.next(true)
                this.router.navigate(['/training']) 
            } else {
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }
    
    registerUser(authData: AuthData) {
        this.uiService.loadingStateChange.next(true);
        this.afAuth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password)
            .then(result => {
                this.uiService.loadingStateChange.next(false);
                this.uiService.showSnackbar("Account successfully created", null, 3000);
                this.initAuthListener();
            })
            .catch(err => {
                this.uiService.loadingStateChange.next(false);
                this.uiService.showSnackbar(err.message, null, 5000);
            });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChange.next(true);
        this.afAuth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        )
        .then(result => {
            this.uiService.loadingStateChange.next(false);
            this.initAuthListener();
        })
        .catch(err => {
            this.uiService.loadingStateChange.next(false);
            this.uiService.showSnackbar("Invalid email or password. " + err.message, null, 5000)
        });

    }

    isAuth() { // This is used in auth-guard 
        return this.isAuthenticated;
    }
    logout() {
        this.trainingService.cancelSubscriptions();
        this.uiService.showSnackbar("Your are logged out", null, 3000);
        this.afAuth.signOut();
    }


}