import { IOctant, IDescWithRange } from "psychology/build/main/types/types";
import { getIndexByRange } from "psychology";

export function getModifiedSubAxes(subAxes: string[][]) {
    return subAxes.map(item => item.map(str => str.split(' - ')))
}

export function getSum(tableData: ([string, number] | [string, number, number])[]): number {
    return tableData.map(item => item[1]).reduce((a, b) => Number(a) + Number(b))
}

export function getOctantFraction(octant: IOctant, octantList: readonly IOctant[]): number {
    const sum: number = octantList.map(item => item.value).reduce((a, b) => a + b)
    return octant.value / sum
}

/**
 * Описание психологического портрета
 * @param octant
 * @param data
 * @param fullProfileList
 */
export function getPortraitDesc(octant: IOctant, data: string[][][], fullProfileList: { title: string, options: IDescWithRange[] }[]): string[][] {
    const descByIndex = data[octant.index]

    let severityIndex = getIndexByRange(octant.value, fullProfileList[1].options)

    if (severityIndex > 2) {
        severityIndex = 2
    }
    // need to choose addition description by severity in fist line of the table
    const fistItem = descByIndex[0]
    const descBySeverity = fistItem[2][severityIndex]

    // change fist line of the table with edited description
    const fistItemEdited = [fistItem[0], fistItem[1] + descBySeverity]

    return [fistItemEdited, ...descByIndex.slice(1)]
}

/**
 * Описание психотипа
 * @param octants
 * @param data
 */
export function getPsychoTypeDesc(octants: readonly IOctant[], data: (string[])[]): string | null {
    const value1 = octants[0].value
    const value2 = octants[1].value
    const typeInd = octants[0].index // get psycho type group index
    const diff: number = value1 * 0.15 // difference between 1st and 2nd max values
    const range = [8.75, 42.35, 140, 218.57]
    let descInd: number

    if (value1 < range[0] || value1 > range[3]) {
        return null
    }

    // combined profile
    if (value1 - value2 < diff && octants[1].code === octants[0].code.toUpperCase()) {
        const ind = typeInd > 3 ? typeInd - 4 : typeInd
        return data[ind][3]
    }

    if (value1 >= range[0] && value1 < range[1]) {
        descInd = 0
    } else if (value1 >= range[1] && value1 < range[2]) {
        descInd = 1
    } else {
        descInd = 2
    }

    // mono profile
    return data[typeInd][descInd]
}