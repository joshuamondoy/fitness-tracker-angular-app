import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

import { HeaderComponent } from "./header/header.component";
import { SidenavListComponent } from "./sidenav-list/sidenav-list.component";

@NgModule({
    declarations:[
        HeaderComponent,
        SidenavListComponent

        
    ],
    imports:[
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports:[]
})
export class NavigationModule{

}