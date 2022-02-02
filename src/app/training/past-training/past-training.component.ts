import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.sevice';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit{
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exchangedSubscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    // this.trainingService.finishedExercisesChanged
    this.store.select(fromTraining.getFinishedExercises)
    .subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
    
  }
  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngOnDestroy(): void {
  //    if(this.exchangedSubscription) {
  //     this.exchangedSubscription.unsubscribe();
  //    }
  // }

}
