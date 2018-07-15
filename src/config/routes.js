import todoApi from '../api/todo';
import objectApi from '../api/object';

import packageJson from '../../package.json';

const API_V1 = '/api/v1';

export default (app) => {
    app.get(API_V1, (req, res) => {
        res.json({ version: packageJson.version });
    });

    app.use(API_V1, todoApi);
    app.use(API_V1, objectApi);

};
