import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../shared/components/shared.module";
import { MainComponentRoutingModule } from "./main-component-routing.module";
import { MainComponent } from "./main.component";

@NgModule({
    declarations:[MainComponent],
    imports:[CommonModule,SharedModule,
        FormsModule,
        IonicModule,
        MainComponentRoutingModule]
})
export class MainComponentModule{}