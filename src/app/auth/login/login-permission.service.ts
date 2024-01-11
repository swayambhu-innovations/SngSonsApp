import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import {
    Firestore,
    addDoc,
    collection,
    deleteDoc,
    doc,
    documentId,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Config } from "src/app/config";

@Injectable({
    providedIn: 'root',
})

export class LoginPermissionService {
    showOtp = false;
    constructor(
        public firestore: Firestore,
        private router: Router,
        private auth: Auth
    ) { }

    checkContactNumber(phone: string) {
        return getDocs(query(collection(this.firestore, Config.collection.users), where(documentId(), '==', phone.toString())));
    }

    setLocal(user: any) {
        localStorage.setItem(Config.localStorage.userdata, JSON.stringify(user));
    }

    async redirectUser(loader: any) {
        let user: any = localStorage.getItem(Config.localStorage.userdata);
        if (!user) {
            return;
        }
        loader.present();
        user = JSON.parse(user);
        await this.checkContactNumber(user.phoneNumber.toString()).then(async (data) => {
            if (data.docs && data.docs.length) {
                const userAccess: any = { ...data.docs[0].data(), id: data.docs[0].id };
                if (!userAccess.active) {
                    this.router.navigate(['/login/error']);
                } else {
                    user = { ...user, access: { ...userAccess } };
                    this.setLocal(user);
                    this.router.navigate(['/main/home']);
                }
            } else {
                this.router.navigate(['/login/error']);
            }
            loader.dismiss();
        })
    }

    logout(loader: any) {
        loader.present();
        this.showOtp = false;
        this.auth.signOut().then(() => {
            localStorage.removeItem('userdata');
            this.router.navigate(['/login']);
        }, function(error) {
            
        });
        loader.dismiss();
    }

}
