import { NgModule } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { ConfirmationComponent } from "../main/common/confirmation/confirmation.component";

@NgModule({
    declarations:[
        FooterComponent,
        HeaderComponent,
        ConfirmationComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule
    ],
    exports:[
        FooterComponent,
        HeaderComponent,
        ConfirmationComponent
    ]
})

export class SharedModule{}