import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class VoucherService {
    selectedDate = new DatePipe('en-US').transform(new Date(), 'YYYY-MM-dd');
}