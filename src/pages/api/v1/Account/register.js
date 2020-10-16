const userData = require('../../userData')

export default function(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    const incData = req.body.data
    console.log(incData)
    res.end(JSON.stringify({ ...userData, username: incData.username }))
}
