import { UserResult, getAndDecodeData, getFamous, getDescByRange } from 'psychology'
import axios from 'axios'
import {
    getModifiedSubAxes,
    getPortraitDesc,
    getProfileDesc,
    TablesWithBars,
    getPsychoTypeDesc
} from '../../../../page-layouts/test/test-result/functions'
import { LANG_DEFAULT } from "../../../../constants/constants";

const urlDesc = `${process.env.CONTENT_API}/psychologies/2`
const urlTerms = `${process.env.CONTENT_API}/psychologies/1`

export default async function handler(req, res) {
    let encdata: string

    if (req.method === 'GET') {
        encdata = req.query.encdata
    } else if (req.method === 'POST') {
        encdata = req.body.data.encdata
    } else {
        res.status(405).end()
    }

    const { data, decoded } = getAndDecodeData(null, encdata)
    const lang = req.body.data?.lang || LANG_DEFAULT

    if (!data) {
        res.status(400).send('failed result code :(')
        return
    }

    const terms = await getTerms(lang)
    const descriptions = await getDescriptions(lang)
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
    const fullProfile = UserResult(data[1])
    const { person } = getFamous(fullProfile.mainOctant, famousList, sex)
    const modedSubAxes = getModifiedSubAxes(subAxes)

    const tables = TablesWithBars(modedSubAxes, tablesWithBarsTitles, data[1])
    const portraitDesc = getPortraitDesc(fullProfile.mainOctant, complexData, fullProfileList)
    const portraitDescSoft = getPortraitDesc(
        fullProfile.mainOctant,
        complexDataSoft,
        fullProfileList
    )
    const psychoTypeDesc = getPsychoTypeDesc(fullProfile.sortedOctants, psychoTypeList) || ''
    const fullProfileData = getProfileDesc(
        fullProfileList,
        terms,
        getDescByRange,
        tables,
        decoded,
        fullProfile
    )

    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    res.end(
        JSON.stringify({
            person,
            psychoTypeDesc,
            portraitDesc,
            portraitDescSoft,
            fullProfileData
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
