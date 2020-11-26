const express = require('express')
const Next = require('next')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const generatePdf = require('./pdf-generator/pdf-generator')

const port = process.env.PORT || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev })
const handle = app.getRequestHandler()

const server = express()

app.prepare()
    .then(() => {
        server.use(cookieParser())
        server.use(cors())
        // server.use(bodyParser.urlencoded({ extended: true }))
        // server.use(bodyParser.json())
        server.use(generatePdf)

        server.use(['/signin', '/registration'], (req, res, next) => {
            if (req.cookies.token) {
                res.redirect('/')
            } else {
                next()
            }
        })

        server.use(['/profile', '/estimation'], (req, res, next) => {
            if (!req.cookies.token) {
                res.redirect('/')
            } else {
                next()
            }
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.post('*', (req, res) => {
            return handle(req, res)
        })

        server.put('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, err => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })
