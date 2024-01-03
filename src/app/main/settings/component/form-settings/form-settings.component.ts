import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormSettingService } from "./form-settings.service";

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
        active: new FormControl(true, []),
        createdAt: new FormControl(new Date(), []),
        isZSD: new FormControl(false, []),
        id: new FormControl('')
    });
    ngOnInit(): void {
        this.presentingElement = document.querySelector('.ion-page');
        this.getSettings('voucher-pending-form');
    }

    constructor(
        private formSettingService: FormSettingService
    ) {

    }

    async getSettings(formId: string) {
        const data = await this.formSettingService.getSettings(formId);
        const variables = data.docs.map((item) => {
            return {...item.data(), id: item.id}
        })
        console.log(variables);
    }

    submitForm(){
        console.log(this.formSettings.value);
        // this.formSettingService.addSettings('voucher-pending-form', this.formSettings.value);
        this.formSettings.reset();
    }
} 