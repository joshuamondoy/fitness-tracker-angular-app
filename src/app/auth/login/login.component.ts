import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  loadingSubs: Subscription;
  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChange
    .subscribe(isLoading => this.isLoading = isLoading)
  }
  onSubmit(data : NgForm) {
    const value = data.value
    this.authService.login({
      email: value.email,
      password: value.password
    });
    this.authService.userEmail.next(value.email);
    
  }

  ngOnDestroy(): void {
      this.loadingSubs.unsubscribe();
  }


}
