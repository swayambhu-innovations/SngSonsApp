import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { MainComponentRoutingModule } from "./main-component-routing.module";
import { MainComponent } from "./main.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations:[
        MainComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        FormsModule,
        IonicModule,
        MainComponentRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainComponentModule{}