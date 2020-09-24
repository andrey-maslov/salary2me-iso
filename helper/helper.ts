import {currencies, locations} from '../constants/constants';

// export const getLocation = (city = '', locationsArr = locations) => {
//
//     let location = locationsArr.find((item) => {
//         return item.city.toLowerCase() === city.toLowerCase();
//     });
//     return location;
// };


export const stringToBoolean = (string) => {
    switch (string.toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1":
            return true;
        case "false":
        case "no":
        case "0":
        case null:
            return false;
        default:
            return Boolean(string);
    }
};

// function retinaCheck() {
//     const query = "(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 2dppx), (min-resolution: 192dpi)";
//     return (matchMedia(query).matches) ? true : false;
// }

// export const isRetina = retinaCheck();

export const getCurrencySymbol = (nameISO, object = currencies) => {

    for (let prop in object) {
        if (object.hasOwnProperty(prop) && object[prop].nameISO === nameISO) {
            return object[prop].symbol
        }
    }

};


export const getSalariesLimits = (resultsArr) => {
    const med = [];
    resultsArr.map(({avg, max}) => {
        med.push(avg);
        med.push(max);
        return med;
    });

    let minVal = Math.min.apply(null, med);
    let maxVal = Math.max.apply(null, med);

    return [minVal, maxVal]

}

export const isBrowser: boolean = typeof window !== 'undefined'


export const parseQueryString = ( queryString ) => {
    let params = {},
        queries,
        temp,
        i,
        l;

    // Split into key/value pairs
    queries = queryString.replace(/%20/g, ' ').replace('  ', ' ').split("&");

    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }

    return params;
};



export class Helper {

    static addSpace(nStr){
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        let rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, `$1\u00A0$2`);
        }
        return x1 + x2;
    };


    static getConvertedSize = (bytes, precision = 2) => {
        let units = ['b', 'Kb', 'Mb', 'Gb', 'Tb'];

        if (bytes < 500) {
            return `${bytes} ${units[0]}`;
        }
        let pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024));
        pow = Math.min(pow, units.length - 1);

        bytes /= Math.pow(1024, pow);

        return `${bytes.toFixed(precision)} ${units[pow]}`;
    };

}