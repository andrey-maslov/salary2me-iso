const predictions = require('./predictions.js')

module.exports = {
    path: '/api/Predict',
    method: 'POST',
    template: predictions
}