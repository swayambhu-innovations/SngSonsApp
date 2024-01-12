import { Injectable } from '@angular/core';
import {
    Router,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
    UrlTree
} from '@angular/router';
import { Observable, take } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { Config } from 'src/app/config';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {
    constructor(
        private router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let token = localStorage.getItem(Config.localStorage.userdata);
        if (token) {
            return true;
        }
        this.router.navigate(['/login']);
        return false
    }
}