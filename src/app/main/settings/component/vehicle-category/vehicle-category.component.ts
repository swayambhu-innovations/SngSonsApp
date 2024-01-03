import { Component, OnInit } from "@angular/core";

@Component({
    selector:'app-vehicle-category',
    templateUrl:'./vehicle-category.component.html',
    styleUrls:['./vehicle-category.component.scss']
})

export class VehicleCategoryComponent implements OnInit{
    presentingElement:any = '' || null;
    ngOnInit(): void {
        this.presentingElement = document.querySelector('.ion-category-page');   
    }
}