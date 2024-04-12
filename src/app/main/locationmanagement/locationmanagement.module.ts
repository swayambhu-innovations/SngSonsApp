import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LocationmanagementPageRoutingModule } from "./locationmanagement-routing.module";

import { LocationmanagementPage } from "./locationmanagement.page";
import { SharedModule } from "src/app/shared/shared.module";
import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // SharedModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    LocationmanagementPageRoutingModule,
  ],
  // declarations: [LocationmanagementPage],
})
export class LocationmanagementPageModule {}