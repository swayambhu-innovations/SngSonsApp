import { Injectable } from '@angular/core';
import { Config } from '../config';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    constructor() { }

    getUserdata() {
        let userdata = localStorage.getItem(Config.localStorage.userdata);
        if (!userdata) {
            return {};
        }
        userdata = JSON.parse(userdata);
        return userdata;
    }

    setUserdata(obj: any) {
        const data = { ...this.getUserdata(), ...obj };
        localStorage.setItem(Config.localStorage.userdata, JSON.stringify(data));
    }

    getDateCreatedBefore(createdDate: any) {
        const now = moment(new Date());
        createdDate = moment(new Date(createdDate));
        const diff = moment.duration(now.diff(createdDate));
        const years = Math.round(diff.asYears());
        const months = Math.round(diff.asMonths());
        const days = Math.round(diff.asDays());
        const hours = Math.round(diff.asHours());
        const minutes = Math.round(diff.asMinutes());
        const seconds = Math.round(diff.asSeconds());
        if(years > 0) {
            return `${years} Years`;
        } else if(months > 0) {
            return `${months} Months`;
        } else if(days > 0) {
            return `${days} Days`;
        } else if(hours > 0) {
            return `${hours} Hours`;
        } else if(minutes > 0) {
            return `${minutes} Minutes`;
        } else if(seconds > 0) {
            return `${seconds} Seconds`;
        }
        return '';
    }
}