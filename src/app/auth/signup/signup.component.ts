import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
maxDate: Date;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  this.maxDate = new Date();
  this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(data : NgForm) {
    const value = data.value
    this.authService.registerUser({
      email: value.email,
      password: value.password
    });
    this.authService.userEmail.next(value.email)
  }

}
