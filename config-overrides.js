const { configureConfigOverrides } = require('@jutro/overrides');
const { applyDigitalWebpackOverrides } = require('gw-build-config-overrides');
const gwPaths = require('gw-build-config-paths');

const configItems = require('./configItems');

const result = configureConfigOverrides({ configItems });
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

module.exports = {
    ...result,
    paths: (paths) => {
        return {
            ...paths,
            ...gwPaths
        };
    },
    webpack: (baseConfig, env) => {
        const jutroConfig = result.webpack(baseConfig, env);
        applyDigitalWebpackOverrides(jutroConfig);
        return jutroConfig
    },
    devServer: (baseDevConfig) => {
        return function(proxy, allowedHost) {
            // default config
            const baseConfig = baseDevConfig(proxy, allowedHost);

            // override
            const config = {
                ...baseConfig,
                contentBase: gwPaths.appPublic,
                public: allowedHost,

                // In case the web application continously reloads after being opened
                // it might be useful to uncomment the configuration below
                // so that potential 404 (usually causing the reload) will be surfaced more clearly
                // historyApiFallback: false;

                // It is important to tell WebpackDevServer to use the same "root" path
                // as we specified in the config. In development, we always serve from /.
                publicPath: '/',

                // Enable HTTPS if the HTTPS environment variable is set to 'true'
                https: protocol === 'https'
            };
            return config;
        };
    }
};
