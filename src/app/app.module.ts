import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { TrainingModule } from './training/training.module';
import { reducers } from './app.reducer';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StoreModule } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.sevice';
import { UIService } from './shared/ui.service';





@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent, 
    SidenavListComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    TrainingModule,
    AngularFirestoreModule, // We still add this here because it needs it's sevice upon app load
    AngularFireModule.initializeApp(environment.firebase), // Connection to firebase app
    StoreModule.forRoot(reducers)
    
  ],
  providers: [AuthService, TrainingService, UIService], // This will unsure that we only use one instance of this service within this project
  bootstrap: [AppComponent],
  
})
export class AppModule { }
