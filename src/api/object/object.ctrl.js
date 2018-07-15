import ObjectDa from './object.da';

const objectMapper = {
    id: 'key'
};

export default {
    get_method,
    post_method
};

function object_parse(body) {
    let newBody = {key: "", value: ""};
    
    console.log(body);

    if (Object.keys(body).length === 1) {
        newBody.key = Object.keys(body)[0];
        newBody.value = Object.values(body)[0];
    } else
        return;

    return newBody;
}


function get_method(req, res) {

    let query = {};
    if (req.query)
        query = req.query;
    
    
    let params = {};
    if (req.params) {
        for (let key in req.params) {
            if (objectMapper[key])
                params[objectMapper[key]] = req.params[key];
        }
    }

    ObjectDa.get_method(params, query)
            .then((objects) => {
                res.status(200).json(objects);
            })
            .catch(() => {
                res.sendStatus(422);
            });
}


function post_method(req, res) {
    
    let body = {};
    if (req.body)
        body = object_parse(req.body);
    
    if (!body)
        return;

    console.log("POST", body );

    ObjectDa.post_method(body)
            .then((objects) => {
                res.status(200).json(objects);
            })
            .catch(() => {
                res.sendStatus(422);
            });
}
