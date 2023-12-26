import { Component, OnInit } from "@angular/core";

@Component({
    selector:'app-form-setting',
    templateUrl:'./form-settings.component.html',
    styleUrls:['./form-settings.component.scss']
})

export class FormSettingComponent implements OnInit{
    presentingElement:any = '' || null;
    ngOnInit(): void {
        this.presentingElement = document.querySelector('.ion-page');   
    }
} 