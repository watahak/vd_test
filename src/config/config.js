/**
 * Default config for all environment types
 * @type {{db: string, apiPort: number}}
 */
const defaultConfig = {
    db: 'mongodb://heroku_lrmjfzlj:bfii821qc3dsl13jgb4m24ua1l@ds137651.mlab.com:37651/heroku_lrmjfzlj',
    apiPort: process.env.PORT || 3000
};

/**
 * Enviroment specific configuration
 * @type {{prod: {}, dev: {}, test: {apiPort: number}}}
 */
const envConfig = {
    prod: {apiPort : process.env.PORT || 8080},
    dev: {},
    test: {
        apiPort: 3100
    }
};

/**
 * Loads config based on the current environment
 * @returns {*}
 */
function loadConfig() {
    const env = process.env.NODE_ENV || 'dev';

    if (!envConfig[env]) {
        throw new Error(`Environment config for environment '${env}' not found. process.env.NODE_ENV must be one of '${Object.keys(envConfig)}'`);
    }

    console.log('[INFO] config loaded for environment: ', env);

    // merge default config with environment specific config
    return Object.assign({}, defaultConfig, envConfig[env]);
}

export default loadConfig();
