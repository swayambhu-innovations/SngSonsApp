import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ShipmentsService } from "./home/tabs/shipments/shipments.service";
import { ImportExportService } from "./settings/component/import-export/import-export.service";

@Component({
    selector:'app-main',
    templateUrl:'./main.component.html',
    styleUrls:['./main.component.scss']
})

export class MainComponent {
    currentRoute: string = '';
    excludeFooterIn: string[] = [
        '/main/settings/edit-profile'
    ]
    constructor(
        private router: Router,
        private shipmentService : ShipmentsService,
        private importExportService: ImportExportService,
    ) {
        this.router.events.subscribe((route) => {
            if (route instanceof NavigationEnd) {
                this.currentRoute = route.url;
            }
        });
        this.setUpInitialData();
    }

    async setUpInitialData(){
        (await this.importExportService.getAllVendors()).docs.map((vendor: any) => {
            this.shipmentService.vendorsById[vendor.id] = { ...vendor.data(), id: vendor.id };
            return { ...vendor.data(), id: vendor.id }
        });
    }
}