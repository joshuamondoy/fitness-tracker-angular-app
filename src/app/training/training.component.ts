import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TrainingService } from './training.sevice';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training/training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  // ongoingTraining: boolean = false;
  ongoingTraining$: Observable<boolean>;
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
    //   if(exercise) {
    //     this.ongoingTraining = true;
    //   } else {
    //     this.ongoingTraining = false;
    //   }
     
    // });
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);

  }
  // ngOnDestroy(): void {
  //     if(this.exerciseSubscription) {
  //       this.exerciseSubscription.unsubscribe();
  //     }
  // }

}
