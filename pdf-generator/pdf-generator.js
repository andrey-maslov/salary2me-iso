const convertHTMLToPDF = require('pdf-puppeteer')
const { Router } = require('express')
const template = require('./templates/template')

const router = Router()

router.post('/create-pdf', (req, res, next) => {
    const body = []
    req.on('data', chunk => {
        body.push(chunk)
    })
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString()
        const { radar, testData } = JSON.parse(parsedBody)
        // Options : https://pocketadmin.tech/ru/puppeteer-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-pdf/
        convertHTMLToPDF(
            template(radar, testData),
            pdf => {
                res.setHeader('Content-Type', 'application/pdf')
                res.send(pdf)
            },
            { scale: 0.6 },
            null,
            true
        )
    })
})

module.exports = router
