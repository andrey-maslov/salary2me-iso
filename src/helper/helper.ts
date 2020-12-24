import axios from 'axios'
import { CONTENT_API, currencies, locations } from '../constants/constants'
import { AnswerType } from '../typings/types'
import { baseTestResultType, DecodedDataType, IUserResult } from "psychology/build/main/types/types";
import { UserResult } from "psychology";

// export const getLocation = (city = '', locationsArr = locations) => {
//
//     let location = locationsArr.find((item) => {
//         return item.city.toLowerCase() === city.toLowerCase();
//     });
//     return location;
// };

export const stringToBoolean = string => {
    switch (string.toLowerCase().trim()) {
        case 'true':
        case 'yes':
        case '1':
            return true
        case 'false':
        case 'no':
        case '0':
        case null:
            return false
        default:
            return Boolean(string)
    }
}

// function retinaCheck() {
//     const query = "(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 2dppx), (min-resolution: 192dpi)";
//     return (matchMedia(query).matches) ? true : false;
// }

// export const isRetina = retinaCheck();

export const getCurrencySymbol = (nameISO, object = currencies) => {
    for (const prop in object) {
        if (object.hasOwnProperty(prop) && object[prop].nameISO === nameISO) {
            return object[prop].symbol
        }
    }
}

export const getSalariesLimits = resultsArr => {
    const med = []
    resultsArr.map(({ avg, max }) => {
        med.push(avg)
        med.push(max)
        return med
    })

    const minVal = Math.min.apply(null, med)
    const maxVal = Math.max.apply(null, med)

    return [minVal, maxVal]
}

export const isBrowser: boolean = typeof window !== 'undefined'

export const parseQueryString = queryString => {
    const params = {}
    let temp
    let i
    let l

    // Split into key/value pairs
    const queries = queryString
        .replace(/%20/g, ' ')
        .replace('  ', ' ')
        .split('&')

    // Convert the array of strings into an object
    for (i = 0, l = queries.length; i < l; i++) {
        temp = queries[i].split('=')
        params[temp[0]] = temp[1]
    }

    return params
}

export const getChartLabels = (result: (string | number)[][]): string[] => {
    return result.map(item => item[0].toString())
}

export const getRealData = (result: (string | number)[][]): number[] => {
    return result.map(item => +item[1])
}

export const getDesiredData = (result: (string | number)[][]): number[] | boolean => {
    if (result[0][2]) {
        return result.map(item => +item[2])
    }
    return false
}

export async function fetchPageContent(page: string) {
    if (!page) {
        console.error('page is not defined')
        return false
    }

    const pages = {
        terms: 4,
        'cookie-policy': 2,
        'privacy-policy': 3
    }

    return axios(`${CONTENT_API}/content-blocks/${pages[page]}`)
        .then(res => {
            return res.data.content_en
        })
        .catch(err => {
            console.error(err)
        })
}

export const checkAnswers = (answers: AnswerType[]) => {
    for (let i = 0; i < answers.length; i++) {
        if (!answers[i].value) {
            return i
        }
    }
    return -1
}

export function getRandomIntInclusive(min: number, max: number) {
    const Min = Math.ceil(min)
    const Max = Math.floor(max)
    return Math.floor(Math.random() * (Max - Min + 1)) + Min // Max and Min includes
}

export function getQueryFromURL(searchStr: string, key: string): string {
    if (!searchStr) return ''
    const queries = searchStr.replace('?', '').split('&')
    const needList = queries.filter(item => item.match(new RegExp(key))).join()
    if (!needList) return ''
    return needList.replace(`${key}=`, '')
}

export function sanitize(str: string): string {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    }
    const reg = /[&<>"'/]/gi
    const sanitized = str.replace(reg, match => map[match])
    return sanitized.replace(/( {2,})/i, ' ')
}

export class Helper {
    static addSpace(nStr) {
        nStr += ''
        const x = nStr.split('.')
        let x1 = x[0]
        const x2 = x.length > 1 ? `.${x[1]}` : ''
        const rgx = /(\d+)(\d{3})/
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, `$1\u00A0$2`)
        }
        return x1 + x2
    }

    static getConvertedSize = (bytes, precision = 2) => {
        const units = ['b', 'Kb', 'Mb', 'Gb', 'Tb']

        if (bytes < 500) {
            return `${bytes} ${units[0]}`
        }
        let pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024))
        pow = Math.min(pow, units.length - 1)

        bytes /= Math.pow(1024, pow)

        return `${bytes.toFixed(precision)} ${units[pow]}`
    }
}

export function encodeData(data: unknown): string {
    const string = JSON.stringify(data)
    const buff = Buffer.from(string)
    return buff.toString('base64')
}

export function encodeDataForURL(data: unknown): string {
    const string = JSON.stringify(data)
    const buff = Buffer.from(string)
    const uriEnc = buff.toString('base64')
    return encodeURIComponent(uriEnc)
}

/**
 * Validate if user answered thruthly. If value of main octant more than minimum threshold
 * @param testResult
 * @param threshold
 */
export function isTestPassed(testResult: baseTestResultType, threshold): boolean {
    if (!testResult) {
        return false
    }
    const fullProfile: IUserResult = UserResult(testResult)
    return fullProfile.mainOctant.value > threshold
}
