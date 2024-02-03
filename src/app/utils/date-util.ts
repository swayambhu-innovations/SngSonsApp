import * as moment from "moment"

export const formatDate = (date: any, format: string) => {
    if (!date) {
        return '';
    }
    return moment(new Date(date.seconds * 1000)).format(format);
}

export const formatDateJS = (date: any, format: string) => {
    if (!date) {
        return '';
    }
    return moment(new Date(date)).format(format);
}