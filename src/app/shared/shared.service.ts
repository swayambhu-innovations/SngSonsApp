import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    public refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}