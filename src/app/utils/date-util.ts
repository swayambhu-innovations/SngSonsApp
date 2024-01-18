import * as moment from "moment"

export const formatDate = (date: any, format: string) => {
    return moment(new Date(date.seconds * 1000)).format(format);
}