const {merge} = require('webpack-merge')
const BasicPart = require('./BasicPart')
const TerserPlugin = require('terser-webpack-plugin')

const buildWebpackConfig = merge(BasicPart, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin()
        ]
    }
})

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig)
})