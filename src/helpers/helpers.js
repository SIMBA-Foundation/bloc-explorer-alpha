/**
 * Helpers Functions
 */
import moment from "moment";

// Get Date
export function getTheDate(timestamp, format) {
    let time = timestamp * 1000;
    let formatDate = format ? format : "MM-DD-YYYY";
    return moment(time).format(formatDate);
}

// Convert Date To Timestamp
export function convertDateToTimeStamp(date, format) {
    let formatDate = format ? format : "YYYY-MM-DD";
    return moment(date, formatDate).unix();
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = "...";
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}

/**
 * Function to return currenr app layout
 */
export function getCurrentAppLayout(router) {
    let location = router.history.current.fullPath;
    let path = location.split("/");
    return path[1];
}

export function getDateDiff(timestamp) {
    var publishTime = timestamp,
        d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = parseInt(new Date().getTime() / 1000),
        d,
        date = new Date(publishTime * 1000),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    if (M < 10) {
        M = "0" + M;
    }
    if (D < 10) {
        D = "0" + D;
    }
    if (H < 10) {
        H = "0" + H;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }

    d = timeNow - publishTime;
    d_days = parseInt(d / 86400);
    d_hours = parseInt(d / 3600);
    d_minutes = parseInt(d / 60);
    d_seconds = parseInt(d);

    if (d_days > 0) {
        if (d_days < 2) {
            return d_days + " Day Ago";
        } else {
            return d_days + " Days Ago";
        }
    } else if (d_days <= 0 && d_hours > 0) {
        return d_hours + " Hrs Ago";
    } else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + " Mins Ago";
    } else if (d_seconds < 60) {
        if (d_seconds <= 0) {
            return "Just Now";
        } else {
            return d_seconds + " Secs Ago";
        }
    } else {
        return M + "-" + D + " " + H + ":" + m;
    }
}
