import * as moment from "moment"

export const formatDate = (date: any, format: string) => {
    if (!date) {
        return '';
    }
    let dt = moment(new Date(date.seconds * 1000)).format(format);
    if (dt === 'Invalid date') {
        dt = formatDateJS(date, format);
    }
    return dt;
}

export const formatDateJS = (date: any, format: string) => {
    if (!date) {
        return '';
    }
    return moment(new Date(date)).format(format);
}