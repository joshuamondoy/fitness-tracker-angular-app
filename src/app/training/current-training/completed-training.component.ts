import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainingService } from '../training.sevice';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-stop-training',
  template: `<div fxLayoutAlign="center center" fxLayout="column">
                <h1 mat-dialog-title>Congratulations!</h1>
                <mat-dialog-content>You already completed.</mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-flat-button color="accent" [mat-dialog-close]="true">Close</button>
                </mat-dialog-actions>
              </div>`
})
export class CompletedTrainingComponent implements OnInit {
  exerciseName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
              private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { } // this is like subscribing to a subject

  ngOnInit(): void {
      // this.exerciseName = this.trainingService.exercisesName
     
      
  }
  

}
