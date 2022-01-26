import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription: Subscription;
  activeUser: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
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
  ngOnDestroy(): void {
      this.authSubscription.unsubscribe(); // clears up uneeded memory to prevent memory leaks
  }
}
