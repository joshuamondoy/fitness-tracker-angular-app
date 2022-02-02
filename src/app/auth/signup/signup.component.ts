import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  // isLoading: boolean = false;
  isLoading$: Observable<boolean>;
  hide: boolean = true;
  private loadingSubs: Subscription;
  constructor(private authService: AuthService,
              private uiService: UIService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    // this.loadingSubs = this.uiService.loadingStateChange
    //   .subscribe(isLoading => this.isLoading = isLoading)
  }
  onSubmit(data : NgForm) {
    const value = data.value
    this.authService.registerUser({
      email: value.email,
      password: value.password
    });
    this.authService.userEmail.next(value.email)
  }

  // ngOnDestroy(): void {
  //   if(this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }

}
