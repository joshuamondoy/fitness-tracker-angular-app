import { NgModule } from "@angular/core";

import { TrainingComponent } from "./training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { CompletedTrainingComponent } from "./current-training/completed-training.component";
import { SharedModule } from "../shared/shared.module";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { TrainingRoutingModule } from "./training-routing.module";


@NgModule({
    declarations:[
        TrainingComponent,
        NewTrainingComponent,
        CurrentTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent,
        CompletedTrainingComponent
    ],
    imports:[
        SharedModule,
        AngularFirestoreModule,
        TrainingRoutingModule
    ],
    exports:[],
    entryComponents: [StopTrainingComponent, CompletedTrainingComponent] // to open it programmatically
})
export class TrainingModule{

}