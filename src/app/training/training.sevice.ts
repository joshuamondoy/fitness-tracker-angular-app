import { Exercise } from "./exercise.model";
import { Subject} from "rxjs";
import { map, take } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { UIService } from "../shared/ui.service";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { CompletedTrainingComponent } from "./current-training/completed-training.component";
import * as UI from '../shared/ui.action'
import * as fromTraining from '../training/training.reducer';
import { Store } from "@ngrx/store";
import * as Trainng from '../training/training.action';


@Injectable() // Annotation for AngularFirestore
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    exercisesName: string;
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private fbSubs: Subscription[] = []; 

    constructor(private db: AngularFirestore,
                private dialog: MatDialog,
                private uiService: UIService,
                private store: Store<fromTraining.State>) {}

    fetchAvailabelExercises() {
        this.store.dispatch(new UI.StartLoading())
        // this.uiService.loadingStateChange.next(true);
        this.fbSubs.push(this.db.collection('availableExercises')
        .snapshotChanges()
        .pipe(map(docArray => {
        return docArray.map(doc => {
            // throw(new Error())
            return{
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories']
            };
        });
     }))
    .subscribe((exercises: Exercise[]) => {
        // this.uiService.loadingStateChange.next(false);
        this.store.dispatch(new UI.StopLoading())
        // this.availableExercises = exercises;
        // this.exercisesChanged.next([...this.availableExercises]);
        this.store.dispatch(new Trainng.SetAvailableTrainings(exercises));
    }, error => {
        // this.uiService.loadingStateChange.next(false);
        this.store.dispatch(new UI.StopLoading())
        this.uiService.showSnackbar('Fetching exercises failed. Please try again later.', null, 3000)
        this.exercisesChanged.next(null);
    }))};

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises')
        .add(exercise)
        
    }
    
    fetchCompletedOrCancelledExercises() {
        // this.uiService.loadingStateChange.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.fbSubs.push(this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
            // this.finishedExercisesChanged.next(exercises)
            this.store.dispatch(new Trainng.SetFinishedTrainings(exercises));
            // this.uiService.loadingStateChange.next(false)
            this.store.dispatch(new UI.StopLoading())

        }));
    }

    startExercise(selectedId: string) {
        // this.exercisesName = selectedId        
        // this.runningExercise = this.availableExercises.find( 
        //     ex => ex.name === selectedId
        //   );
        //   this.exerciseChanged.next({ ...this.runningExercise});
        this.store.dispatch(new Trainng.StartTraining(selectedId));

          
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex, 
                date: new Date(), 
                state: 'Completed'
            });
            const dialogRef = this.dialog.open(CompletedTrainingComponent);
            dialogRef.afterClosed()
            // this.runningExercise = null;
            // this.exerciseChanged.next(null);
            this.store.dispatch(new Trainng.StopTraining()); 
        })
        // this.addDataToDatabase({
        //     ...this.runningExercise, 
        //     date: new Date(), 
        //     state: 'Completed'
        // });
        // const dialogRef = this.dialog.open(CompletedTrainingComponent);
        // dialogRef.afterClosed()
        // // this.runningExercise = null;
        // // this.exerciseChanged.next(null);
        // this.store.dispatch(new Trainng.StopTraining());

    }
  
    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                // ...this.runningExercise, 
                ...ex,
                duration: ex.duration * (progress / 100), 
                calories: ex.calories * (progress / 100), 
                date: new Date(), 
                state: 'Cancelled'
            });
            // this.runningExercise = null;
            // this.exerciseChanged.next(null);  
            this.store.dispatch(new Trainng.StopTraining());
        })
        // this.addDataToDatabase({
        //     // ...this.runningExercise, 
        //     duration: this.runningExercise.duration * (progress / 100), 
        //     calories: this.runningExercise.calories * (progress / 100), 
        //     date: new Date(), 
        //     state: 'Cancelled'
        // });
        // // this.runningExercise = null;
        // // this.exerciseChanged.next(null);  
        // this.store.dispatch(new Trainng.StopTraining());
    }

    // s
    cancelSubscriptions() {
        // this is for the error upon logout("Missing or insufficient permission")
        this.fbSubs.forEach(sub => sub.unsubscribe())
    }
}