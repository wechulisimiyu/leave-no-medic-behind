const { ComponentLoader } = require('adminjs')

const componentLoader = new ComponentLoader()

const Components = {
    Dashboard: componentLoader.add('Dashboard', './dashboard'),
    // other custom components
}

module.exports = { componentLoader, Components }