import { Component, OnInit, Output, EventEmitter, OnDestroy, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.sevice';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

@Injectable()
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading: boolean = false;
  loadingSubs: Subscription;

 
  constructor(private trainingService: TrainingService,
              private uiService: UIService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged
    .subscribe(exercises => this.exercises = exercises)
    this.loadingSubs = this.uiService.loadingStateChange
    .subscribe(isLoading => {
      this.isLoading = isLoading
      }
    );
    this.fetchExercises();
    
  }
    
  onStartTraining(data: NgForm) {
    this.trainingService.startExercise(data.value.exercise)  
      
  }

  fetchExercises() {
    this.trainingService.fetchAvailabelExercises()
  }

  ngOnDestroy(): void {
      this.exerciseSubscription.unsubscribe();
  }

}
