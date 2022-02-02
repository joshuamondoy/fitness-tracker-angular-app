import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-stop-training',
  template: `<div fxLayoutAlign="center center" fxLayout="column">
                <h1 mat-dialog-title>Are you sure?</h1>
                <mat-dialog-content>You already got {{ passedData.progress }} % progress</mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-flat-button color="accent" [mat-dialog-close]="true">Yes</button>
                    <button mat-stroked-button [mat-dialog-close]="false">No</button>
                </mat-dialog-actions>
              </div>`
})
export class StopTrainingComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { } // this is like subscribing to a subject

  ngOnInit(): void {
  }
  

}
