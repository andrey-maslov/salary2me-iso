const projects = require('./projects.json')

export default function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    const mappedProjects = projects.projects.map(({ title, pool }) => {
        const newPool = pool.items.map(({ name, position, decData }) => {
            const data = JSON.stringify(decData)
            const buff = Buffer.from(data)
            const encData = buff.toString('base64')

            return {
                name,
                position,
                encData
            }
        })

        return {
            title,
            pool: newPool
        }
    })

    res.end(JSON.stringify(mappedProjects))
}
