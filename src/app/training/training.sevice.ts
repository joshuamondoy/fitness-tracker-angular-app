import { Exercise } from "./exercise.model";
import { Subject} from "rxjs";
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { UIService } from "../shared/ui.service";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { CompletedTrainingComponent } from "./current-training/completed-training.component";


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
                private uiService: UIService) {}

    fetchAvailabelExercises() {
        this.uiService.loadingStateChange.next(true);
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
        this.uiService.loadingStateChange.next(false);
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
    }, error => {
        this.uiService.loadingStateChange.next(false);
        this.uiService.showSnackbar('Fetching exercises failed. Please try again later.', null, 3000)
        this.exercisesChanged.next(null);
    }))};

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises')
        .add(exercise)
        
    }
    
    fetchCompletedOrCancelledExercises() {
        this.uiService.loadingStateChange.next(true);
        this.fbSubs.push(this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises)
            this.uiService.loadingStateChange.next(false)

        }));
    }

    startExercise(selectedId: string) {
        this.exercisesName = selectedId        
        this.runningExercise = this.availableExercises.find( 
            ex => ex.name === selectedId
          );
          this.exerciseChanged.next({ ...this.runningExercise});
          
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise, 
            date: new Date(), 
            state: 'Completed'
        });
        const dialogRef = this.dialog.open(CompletedTrainingComponent);
        dialogRef.afterClosed()
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
  
    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100), 
            calories: this.runningExercise.calories * (progress / 100), 
            date: new Date(), 
            state: 'Cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);  
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }
    cancelSubscriptions() {
        // this is for the error upon logout("Missing or insufficient permission")
        this.fbSubs.forEach(sub => sub.unsubscribe())
    }
}