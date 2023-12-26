import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ImportExportComponent } from "./import-export.component";

const routes:Routes=[
    {
        path:'',
        component:ImportExportComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class ImportExportRoutingModule{}