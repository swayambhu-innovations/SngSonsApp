import { Injectable } from "@angular/core";
import { UtilService } from "src/app/utils/util";

@Injectable({
    providedIn: 'root'
})

export class HomeService{
    constructor(private utilService: UtilService){}
    dashBoardSettingFormData:any;
    userAccessData = this.utilService.getUserAccessData();
}