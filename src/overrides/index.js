const appPaths = require('gw-build-config-paths');
const {
    customerAliasesConfig,
    customerRelativeAliasesConfig
} = require('./customer-config');

const { customerPath } = appPaths;

module.exports = {
    customerAliasesConfig,
    customerRelativeAliasesConfig,
    'customer-questionsets-config': `${customerPath}/questionsets-js`,
    'customer-viewmodel-config': `${customerPath}/viewmodel-js`,
    'customer-error-config': `${customerPath}/errors-js`,
    'customer-scheduleitems-config': `${customerPath}/scheduleitems-js`,
    'customer-transportservice-config': `${customerPath}/transportservice-js`,
    'customer-inactivitytimer-config': `${customerPath}/inactivitytimer-js`,
    'customer-utils-config': `${customerPath}/utils-js`,
    'customer-brandingservice-config': `${customerPath}/branding-js`
}
