import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainingService } from '../training.sevice';


@Component({
  selector: 'app-stop-training',
  template: `<div fxLayoutAlign="center center" fxLayout="column">
                <h1 mat-dialog-title>Congratulations!</h1>
                <mat-dialog-content>You already completed {{ exerciseName }}.</mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-raised-button [mat-dialog-close]="true">Close</button>
                </mat-dialog-actions>
              </div>`
})
export class CompletedTrainingComponent implements OnInit {
  exerciseName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
              private trainingService: TrainingService) { } // this is like subscribing to a subject

  ngOnInit(): void {
      this.exerciseName = this.trainingService.exercisesName
  }
  

}
