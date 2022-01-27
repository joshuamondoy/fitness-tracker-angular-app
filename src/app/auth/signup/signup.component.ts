import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  isLoading: boolean = false;
  loadingSubs: Subscription;
  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
  this.maxDate = new Date();
  this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  this.loadingSubs = this.uiService.loadingStateChange
    .subscribe(isLoading => this.isLoading = isLoading)
  }
  onSubmit(data : NgForm) {
    const value = data.value
    this.authService.registerUser({
      email: value.email,
      password: value.password
    });
    this.authService.userEmail.next(value.email)
  }
  
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

}
