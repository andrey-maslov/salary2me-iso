import { CONTENT_API, LANG_DEFAULT } from '../../../../constants/constants'
import questions_ru from '../../../../../public/locales/ru/questions.json'
import questions_en from '../../../../../public/locales/en/questions.json'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const lang = req.query.lang || LANG_DEFAULT
        const questions = {
            ru: questions_ru,
            en: questions_en
        }
        res.status(200)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(questions[lang]))
    } else {
        res.status(405).end()
    }
}
