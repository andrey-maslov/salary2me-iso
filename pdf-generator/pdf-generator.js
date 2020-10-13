const bodyParser = require('body-parser')
const cors = require('cors')
const convertHTMLToPDF = require('pdf-puppeteer')
const template = require('./templates/template2')

function generatePdf(app) {
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.post('/create-pdf', (req, res) => {

        const {radar} = req.body
        convertHTMLToPDF(
            template(radar),
            pdf => {
                // res.setHeader('Content-Type', 'application/pdf')
                res.send(pdf)
            },
            null,
            null,
            true
        )
    })
}

module.exports = generatePdf
