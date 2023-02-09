const { ComponentLoader } = require('adminjs')

const componentLoader = new ComponentLoader()

const Components = {
    MyInput: componentLoader.add('MyInput', './my-input'),
    // other custom components
}

module.exports = { componentLoader, Components }