import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
    selector:'app-main',
    templateUrl:'./main.component.html',
    styleUrls:['./main.component.scss']
})

export class MainComponent {
    currentRoute: string = '';
    excludeFooterIn: string[] = [
        '/main/settings/edit-profile'
    ]
    constructor(
        private router: Router
    ) {
        this.router.events.subscribe((route) => {
            if (route instanceof NavigationEnd) {
                this.currentRoute = route.url;
            }
        });
    }
}