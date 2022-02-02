import { Component,  OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // isLoading: boolean = false;
  isLoading$: Observable<boolean>  
  hide: boolean = true;
  // private loadingSubs: Subscription;
  constructor(private authService: AuthService,
              // private uiService: UIService,
              private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubs = this.uiService.loadingStateChange
    // .subscribe(isLoading => this.isLoading = isLoading)
  }
  onSubmit(data : NgForm) {
    const value = data.value
    this.authService.login({
      email: value.email,
      password: value.password
    });
    this.authService.userEmail.next(value.email);
    
  }

  // ngOnDestroy(): void {
  //     if( this.loadingSubs) {
  //       this.loadingSubs.unsubscribe();
  //     }
  // }


}
