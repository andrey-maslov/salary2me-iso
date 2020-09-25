const predictions = require('./predictions.js')

module.exports = {
    path: '/api/predictions',
    method: 'POST',
    template: predictions
}