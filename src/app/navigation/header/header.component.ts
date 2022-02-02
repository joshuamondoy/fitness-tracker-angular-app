import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  // isAuth: boolean = false;
  isAuth$: Observable<boolean>;4
  authSubscription: Subscription;
  activeUser: string;
  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // })
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    this.authService.userEmail
    .subscribe(email => {
      const splitEmail = email.split("@");
      const name = splitEmail[0];
      this.activeUser = name;
    })
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();

  }
  onLogout() {
    this.authService.logout();
  }
  // ngOnDestroy(): void {
  //     this.authSubscription.unsubscribe(); // clears up uneeded memory to prevent memory leaks
  // }
}
