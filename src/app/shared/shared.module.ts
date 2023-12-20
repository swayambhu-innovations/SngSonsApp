import { NgModule } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations:[FooterComponent],
    imports:[CommonModule,
        FormsModule,
        IonicModule,
    RouterModule],
    exports:[FooterComponent]
})

export class SharedModule{}