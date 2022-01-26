import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.sevice';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.fetchAvailabelExercises()
    this.exerciseSubscription = this.trainingService.exercisesChanged
    .subscribe(exercises => this.exercises = exercises)
    
  }
  onStartTraining(data: NgForm) {
    this.trainingService.startExercise(data.value.exercise)  
      
  }

  ngOnDestroy(): void {
      this.exerciseSubscription.unsubscribe();
  }

}
