import { NgModule } from "@angular/core";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
    declarations:[FooterComponent , HeaderComponent],
    imports:[CommonModule,
        FormsModule,
        IonicModule,
    RouterModule],
    exports:[FooterComponent , HeaderComponent]
})

export class SharedModule{}