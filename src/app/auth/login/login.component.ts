import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(data : NgForm) {
    const value = data.value
    this.authService.login({
      email: value.email,
      password: value.password
    });
    this.authService.userEmail.next(value.email)
    
  }

}
