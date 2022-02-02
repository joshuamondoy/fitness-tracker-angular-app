import { Component, OnInit, Output, EventEmitter, OnDestroy, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.sevice';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

@Injectable()
export class NewTrainingComponent implements OnInit{
  @Output() trainingStart = new EventEmitter<void>();
  // exercises: Exercise[];
  exercises$: Observable<Exercise[]>;
  // private exerciseSubscription: Subscription;
  // isLoading: boolean = true;
  isLoading$: Observable<boolean>;
  loadingSubs: Subscription;

 
  constructor(private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<{ui: fromTraining.State}>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    // this.loadingSubs = this.uiService.loadingStateChange
    // .subscribe(isLoading => {
    //   this.isLoading = isLoading
    //   }
    // );
    this.fetchExercises();
    
  }
    
  onStartTraining(data: NgForm) {
    this.trainingService.startExercise(data.value.exercise)  
      
  }

  fetchExercises() {
    this.trainingService.fetchAvailabelExercises()
  }

  // ngOnDestroy(): void {
  //     if(this.loadingSubs ){
  //       this.loadingSubs.unsubscribe();
  //     }
      
  //     if(this.exerciseSubscription) {
  //       this.exerciseSubscription.unsubscribe();
  //     }
  // }

}
