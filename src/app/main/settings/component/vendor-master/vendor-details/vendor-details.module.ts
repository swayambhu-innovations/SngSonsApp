import { NgModule } from "@angular/core";
import { VendorDetailsRoutingModule } from "./vendor-details-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared.module";
import { VendorDetailsComponent } from "./vendor-details.component";
import { DayWiseSummaryComponent } from "src/app/shared/components/day-wise-summary/day-wise-summary.component";
import { VendorShipmentComponent } from "../vendor-shipment/vendor-shipment.component";

@NgModule({
    declarations : [VendorDetailsComponent , VendorShipmentComponent],
    imports : [
        CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    VendorDetailsRoutingModule
    ]
})

export class VendorDetailsModule{}