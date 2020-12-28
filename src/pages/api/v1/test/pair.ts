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
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.end('Описание для взаимодействия пары')
    }
}
