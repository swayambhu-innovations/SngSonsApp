import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HomeService } from "src/app/main/home/home.service";

@Component({
    selector:'app-footer',
    templateUrl:'./footer.component.html',
    styleUrls:['./footer.component.scss']
})
export class FooterComponent{
    public tabStatus:string='home';
    constructor(public router:Router , public homeService: HomeService){
    }
}