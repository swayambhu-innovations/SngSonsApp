import { Component } from "@angular/core";

@Component({
    selector:'app-user-permission',
    templateUrl:'./user-permission.component.html',
    styleUrls:['./user-permission.component.scss']
})

export class UserPermissionComponent{
    constructor(

    ) {}

    public openRole = false;
    public openUser = false;

    dismissModal = async () => {
        this.openRole = false;
        this.openUser = false;
        return true;
    }

    public permissions = [
        {id: '1', name: 'Upload New ZSD file'},
        {id: '1', name: 'Fill Shipment Voucher'},
        {id: '1', name: 'Fill post Delivery Form'},
        {id: '1', name: 'Discard Vouchers'},
        {id: '1', name: 'Edit Account Settings'},
        {id: '1', name: 'View reports'}
    ]
}