import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Eager loading 
const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
// This will merge it with other router behind the scene, it is already loaded from the time the app load
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class AuthRoutingModule { }
