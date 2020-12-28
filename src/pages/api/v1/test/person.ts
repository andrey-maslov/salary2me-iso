import { UserResult, getAndDecodeData, getFamous, getDescByRange } from 'psychology'
import axios from 'axios'
import {
    getModifiedSubAxes,
    getPortraitDesc,
    getProfileDesc,
    TablesWithBars,
    getPsychoTypeDesc
} from '../../../../page-layouts/test/test-result/functions'
import { CONTENT_API, LANG_DEFAULT, TEST_THRESHOLD } from '../../../../constants/constants'
import { isTestPassed } from '../../../../helper/helper'

const urlDesc = `${CONTENT_API}/psychologies/2`
const urlTerms = `${CONTENT_API}/psychologies/1`

export default async function handler(req, res) {
    let encdata: string
    let lang: string

    if (req.method === 'GET') {
        encdata = req.query.encdata
        lang = req.query.lang || LANG_DEFAULT
    } else if (req.method === 'POST') {
        encdata = req.body.encdata
        lang = req.body.lang || LANG_DEFAULT
    } else {
        res.status(405).end()
    }

    const { data, decoded } = getAndDecodeData(null, encdata)

    if (!data) {
        res.status(400).send('failed result code :(')
    } else {
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

        const answer = isTestPassed(data[1], TEST_THRESHOLD)
            ? {
                  status: 1,
                  data: {
                      person,
                      psychoTypeDesc,
                      portraitDesc,
                      portraitDescSoft,
                      fullProfileData
                  }
              }
            : {
                  status: 0,
                  data: 'Test failed'
              }

        res.status(200)
        res.setHeader('Content-Type', 'application/json')

        res.end(JSON.stringify(answer))
    }
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
