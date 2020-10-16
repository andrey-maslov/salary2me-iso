import { getDescByRange, getFamous, getIndexByRange, UserResult } from 'psychology'

export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    const query = req.query.encdata
    const buff = Buffer.from(query, 'base64')
    const strData = buff.toString('ascii')
    const data = JSON.parse(strData)
    const userResult = UserResult(data[1])

    res.end(JSON.stringify(userResult))
}
