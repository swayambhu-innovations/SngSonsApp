import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormSettingService } from "./form-settings.service";
import { Config } from "src/app/config";
import { LoadingController, ModalController } from "@ionic/angular";
import { NotificationService } from "src/app/utils/notification";

@Component({
    selector:'app-form-setting',
    templateUrl:'./form-settings.component.html',
    styleUrls:['./form-settings.component.scss']
})

export class FormSettingComponent implements OnInit{
    presentingElement:any = '' || null;
    formSettings: FormGroup = new FormGroup({
        variableName: new FormControl('', [Validators.required]),
        variableType: new FormControl('', [Validators.required]),     
        lowerLimit: new FormControl('', [Validators.required]),
        upperLimit: new FormControl('', [Validators.required]),
        active: new FormControl(true,[]),
        createdAt: new FormControl(new Date(), []),
        isZSD: new FormControl(false, []),
        id: new FormControl('')
    });
    isModalOpen:boolean=false;
    public config = Config;
    public formVariable='';
    public variableData: any = {
        'post-dlv-pending-form': [],
        'voucher-pending-form': []
    }

    constructor(
        private formSettingService: FormSettingService,
        private loadingController: LoadingController,
        private notificationService: NotificationService,
        private modalCtrl : ModalController
    ) {}
    
    async ngOnInit() {
        this.presentingElement = document.querySelector('.ion-page');
        let loader = await this.loadingController.create({message:'Please wait...'});
        loader.present();
        await this.getSettings(this.config.formSettingVariable.PostDlvPendingForm);
        await this.getSettings(this.config.formSettingVariable.VoucherPendingForm);
        loader.dismiss();
    }

    openModal(event:any , formId:string) {
        event.stopPropagation();
        this.isModalOpen=true;
        this.formVariable=formId;
    }

    closeModal(){
        this.isModalOpen=false;     
        this.formSettings.reset();
    }
 
    async getSettings(formId: string) {
        const data = await this.formSettingService.getSettings(formId);
        const variables = data.docs.map((item) => {
            return {...item.data(), id: item.id}
        });
        this.variableData[formId] = variables;
    }

    async submitForm(event:any){         
        await this.formSettingService.addSettings(this.formVariable, this.formSettings.value);
        this.formSettings.reset();
        this.getSettings(this.formVariable);
        this.notificationService.showSuccess(this.config.messages.addedSuccessfully);
        this.modalCtrl.dismiss();
    }
} 