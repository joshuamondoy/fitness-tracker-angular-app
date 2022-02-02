import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit{
  @Output() sidenavToggle = new EventEmitter<void>();
  // isAuth: boolean = false;
  isAuth$: Observable<boolean>;
  autSubscription: Subscription;
  activeUser: string;
  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    // this.autSubscription = this.authService.authChange
    // .subscribe(authStatus => {
    //   this.isAuth = authStatus
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
    this.onToggleSidenav();
  }
  // ngOnDestroy(): void {
  //     this.autSubscription.unsubscribe();
  // }
}
