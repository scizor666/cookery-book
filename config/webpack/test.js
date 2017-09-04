// Note: You must restart bin/webpack-dev-server for changes to take effect

const merge = require('webpack-merge')
const sharedConfig = require('./shared.js')
const enzymeConfig = require('./enzyme_exports.js')

module.exports = merge(sharedConfig, enzymeConfig)
