const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.use(cookieParser());

        server.get('/signin', (req, res) => {
            if(req.cookies.token) {
                res.redirect('/');
            } else {
                return app.render(req, res, '/signin', req.query);
            }
        });

        server.get('/register', (req, res) => {
            if(req.cookies.token) {
                res.redirect('/');
            } else {
                return app.render(req, res, '/register', req.query);
            }
        });

        server.get('/profile', (req, res) => {
            if(!req.cookies.token) {
                res.redirect('/')
            } else {
                return app.render(req, res, '/profile', req.query);
            }
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });