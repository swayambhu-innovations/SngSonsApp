import {RouterModule, Routes } from "@angular/router";
import { VendorDetailsComponent } from "./vendor-details.component";
import { NgModule } from "@angular/core";


const routes:Routes =[
    {
        path : '',
        component:VendorDetailsComponent
    }
]

@NgModule({
    imports :[ RouterModule.forChild(routes)],
    exports : [RouterModule]
})

export class VendorDetailsRoutingModule{}