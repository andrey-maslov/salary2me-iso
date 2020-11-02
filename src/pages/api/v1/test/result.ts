import { UserResult, getAndDecodeData, getFamous } from 'psychology'
import axios from 'axios'
import { TablesWithBars } from '../../../../page-layouts/test/test-result/TablesWithBars'
import {
    getModifiedSubAxes,
    getPortraitDesc,
    getPsychoTypeDesc
} from '../../../../page-layouts/test/test-result/functions'

const urlDesc = `${process.env.CONTENT_API}/psychologies/2`
const urlTerms = `${process.env.CONTENT_API}/psychologies/1`

export default async function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    const { encData } = req.body.data
    const { data, decoded, encoded } = getAndDecodeData(null, encData)

    if (!data) {
        res.statusCode = 400
        res.end('failed result code :(')
        return
    }

    const terms = await getTerms('ru')
    const descriptions = await getDescriptions('ru')
    const {
        famousList,
        tablesWithBarsTitles,
        fullProfileList,
        complexData,
        complexDataSoft,
        psychoTypeList
    } = descriptions
    const { subAxes } = terms
    const sex = data[0][2] === 2 ? 1 : data[0][2]
    const { mainOctant, sortedOctants } = UserResult(data[1])
    const { person } = getFamous(mainOctant, famousList, sex)
    const modedSubAxes = getModifiedSubAxes(subAxes)
    // @ts-ignore
    const tables = TablesWithBars(modedSubAxes, tablesWithBarsTitles, data[1])
    const portraitDesc = getPortraitDesc(mainOctant, complexData, fullProfileList)
    const portraitDescSoft = getPortraitDesc(mainOctant, complexDataSoft, fullProfileList)
    const psychoTypeDesc = getPsychoTypeDesc(sortedOctants, psychoTypeList) || ''

    res.end(
        JSON.stringify({
            person,
            psychoTypeDesc,
            portraitDesc,
            portraitDescSoft
        })
    )
}

async function getDescriptions(lang: string) {
    return axios
        .get(urlDesc)
        .then(res => res.data)
        .then(data => {
            return data[`content_${lang}`]
        })
        .catch(err => console.error(err))
}

async function getTerms(lang: string) {
    return axios
        .get(urlTerms)
        .then(res => res.data)
        .then(data => {
            return data[`content_${lang}`]
        })
        .catch(err => console.error(err))
}
