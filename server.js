const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const generatePdf = require('./pdf-generator/pdf-generator')

const port = process.env.PORT || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const server = express()

app.prepare()
    .then(() => {
        server.use(cookieParser())
        server.use(cors())
        // server.use(bodyParser.urlencoded({ extended: true }))
        // server.use(bodyParser.json())
        server.use(generatePdf)

        server.get('/signin', (req, res) => {
            if (req.cookies.token) {
                res.redirect('/')
            } else {
                return app.render(req, res, '/signin', req.query)
            }
        })

        server.get('/registration', (req, res) => {
            if (req.cookies.token) {
                res.redirect('/')
            } else {
                return app.render(req, res, '/registration', req.query)
            }
        })

        server.get('/profile', (req, res) => {
            if (!req.cookies.token) {
                res.redirect('/')
            } else {
                return app.render(req, res, '/profile', req.query)
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
