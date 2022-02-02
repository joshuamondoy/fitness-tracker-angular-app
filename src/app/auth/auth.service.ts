import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UIService } from "../shared/ui.service";
import { TrainingService } from "../training/training.sevice";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.action';
import * as Auth from '../auth/auth.action'

@Injectable() // this is to inject routing service in this service
export class AuthService {
    // authChange = new Subject<boolean>();
    // private isAuthenticated: boolean = false;
    userEmail = new Subject<string>();
  

    constructor(private router: Router, 
                private afAuth: AngularFireAuth,
                private uiService: UIService,
                private trainingService: TrainingService,
                private store: Store<{ui: fromRoot.State}>) {}
    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                // this.isAuthenticated = true;
                // this.authChange.next(true)
                this.store.dispatch(new Auth.SetAuthenticated())
                this.router.navigate(['/training']) 
            } else {
                // this.authChange.next(false);
                // this.isAuthenticated = false;ks
                this.store.dispatch(new Auth.SetUnauthenticated())
                this.router.navigate(['/login']);
                
            }
        });
    }
    
    registerUser(authData: AuthData) {
        // this.uiService.loadingStateChange.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.afAuth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password)
            .then(result => {
                // this.uiService.loadingStateChange.next(false);
                this.store.dispatch(new UI.StopLoading())
                this.uiService.showSnackbar("Account successfully created", null, 3000);
                this.initAuthListener();
            })
            .catch(err => {
                // this.uiService.loadingStateChange.next(false);
                this.store.dispatch(new UI.StopLoading())
                this.uiService.showSnackbar(err.message, null, 5000);
            });
    }

    login(authData: AuthData) {
        // this.uiService.loadingStateChange.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.afAuth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        )
        .then(result => {
            // this.uiService.loadingStateChange.next(false);
            this.store.dispatch(new UI.StopLoading())
            this.initAuthListener();
        })
        .catch(err => {
            // this.uiService.loadingStateChange.next(false);
            this.store.dispatch(new UI.StopLoading())
            this.uiService.showSnackbar("Invalid email or password. " + err.message, null, 5000)
        });

    }

        // isAuth() { // This is used in auth-guard 
        //     return this.isAuthenticated;
        // }
    logout() {
        this.trainingService.cancelSubscriptions();
        this.uiService.showSnackbar("You're logged out", null, 3000);
        this.afAuth.signOut();
    }


}