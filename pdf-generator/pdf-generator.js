const convertHTMLToPDF = require('pdf-puppeteer')
const { Router } = require('express')
const template = require('./templates/template')

const router = Router()

router.post('/create-pdf', (req, res) => {
    const { radar, testData } = req.body

    convertHTMLToPDF(
        template(radar, testData),
        pdf => {
            res.setHeader('Content-Type', 'application/pdf')
            res.send(pdf)
        },
        null,
        null,
        true
    )
})

module.exports = router
