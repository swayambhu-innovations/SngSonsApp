import { Component, OnInit } from "@angular/core";
import { ExcelUploadService } from "src/app/utils/excel-upload";
import { ImportExportService } from "./import-export.service";
import { isEmpty } from "lodash";
import { NotificationService } from "src/app/utils/notification";
import { Config } from "src/app/config";
import { LoadingController } from "@ionic/angular";
import { HomeService } from "src/app/main/home/home.service";

@Component({
    selector: 'app-import-export',
    templateUrl: './import-export.component.html',
    styleUrls: ['./import-export.component.scss']
})

export class ImportExportComponent implements OnInit {

    vehicles: any = {};
    vendors: any = {};
    loader: any;

    constructor(
        public excelUploadService: ExcelUploadService,
        private importExportService: ImportExportService,
        private notification: NotificationService,
        private loadingController: LoadingController,
        public homeService: HomeService
    ) { }

    async ngOnInit() {
        this.loader = await this.loadingController.create({ message: Config.messages.pleaseWait })
        await this.init()
    }

    async init() {
        this.loader.present();
        (await this.importExportService.getAllVehicles()).docs.map((vehicle: any) => {
            this.vehicles[vehicle.id] = { ...vehicle.data(), id: vehicle.id };
            return { ...vehicle.data(), id: vehicle.id }
        });
        (await this.importExportService.getAllVendors()).docs.map((vendor: any) => {
            this.vendors[vendor.data().WSName.split(' ').join('-').toLowerCase()] = { ...vendor.data(), id: vendor.id };
            return { ...vendor.data(), id: vendor.id }
        });
        this.loader.dismiss();
    }

    addZSD(event: any, data: any, formatDate: any, scope: any) {
        data = scope.importExportService.formatShipment(data, formatDate);
        scope.importExportService.addShipments(data, scope, scope.loader, scope.notification);
        event.target.value = "";
    }

    addVendor(event: any, data: any, formatDate: any, scope: any) {
        data = data.map((vendor: any) => {
            return {
                WSName: vendor['W/S Name'],
                WSCode: vendor['W/S Code'],
                postalCode: vendor['Postal Code'],
                WSTown: vendor['W/S Town'],
                panNo: vendor['PAN Number'],
                phoneNO: vendor['Phone Number'],
                GSTNo: vendor['GST Number'],
                shippingType: vendor['Shipping Type'],
                distance: vendor['Distance in km'],
                maxCreditLimit: vendor['Max Credit Limit'],
                vendorProfileImg: '',
                active: true,
                pending: false,
                createdAt: new Date(),
                id: '',
            }
        });
        console.log(data);
    }
}