const convertHTMLToPDF = require('pdf-puppeteer')
const { Router } = require('express')
const template = require('./templates/template')

const router = Router()

router.post('/create-pdf', (req, res, next) => {
    // const { radar, testData } = req.body

    const body = []
    req.on('data', chunk => {
        body.push(chunk)
    })
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString()
        const { radar, testData } = JSON.parse(parsedBody)

        convertHTMLToPDF(
            template(radar, testData),
            pdf => {
                res.setHeader('Content-Type', 'application/pdf')
                res.send(pdf)
                next()
            },
            null,
            null,
            true
        )
    })
})

module.exports = router
