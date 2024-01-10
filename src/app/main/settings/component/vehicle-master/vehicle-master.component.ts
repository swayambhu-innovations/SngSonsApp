import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { VehicleMasterService } from "./vehicle-master.service";
import { ModalController } from "@ionic/angular";

@Component({
    selector:'app-vehicle-master',
    templateUrl:'./vehicle-master.component.html',
    styleUrls:['./vehicle-master.component.scss']
})

export class VehicleMasterComponent implements OnInit{
    addVehicleForm: FormGroup = new FormGroup({
        categoryName: new FormControl('', [Validators.required]),
        weightCapacity: new FormControl(0, [Validators.required]),
        minimumFuel: new FormControl(0, [Validators.required]),
        maximumFuel: new FormControl(0, [Validators.required]),
        minimumToll: new FormControl(0, [Validators.required]),
        maximumToll: new FormControl(0, [Validators.required]),
        defaultKOTCapacity: new FormControl(0, [Validators.required]),
        defaultFuelType: new FormControl('', [Validators.required]),
        active: new FormControl(true, []),
        createdAt: new FormControl(new Date(), []),
        id: new FormControl(''),
    });
    public formInitalValue = this.addVehicleForm.value;
    public isModalOpen:boolean = false;
    presentingElement: any = '' || null;
    public vehicleCategoryId:string='';

    constructor(private route:ActivatedRoute,
        private vehicleMasterService : VehicleMasterService,
        private modalCtrl : ModalController){}

    ngOnInit(): void {
        this.presentingElement = document.querySelector('.ion-vehicle-page'); 
        this.route.params.subscribe(params=>{
            this.vehicleCategoryId = params['id'];
        })
    }

    async submitForm() {
        if(!this.addVehicleForm.valid) {
            this.addVehicleForm.markAllAsTouched();
            return;
        }
        const formData = this.addVehicleForm.value;
        await this.vehicleMasterService.addVehicleCategoryData(formData , this.vehicleCategoryId);
        this.modalCtrl.dismiss();
    }
}