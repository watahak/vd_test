import Q from 'q';
import ObjectModel from './object.model';
var ObjectID = require('mongodb').ObjectID;


export default {
    get_method,
    post_method
};

function get_method(params = {}, query = {}) {
    const deferred = Q.defer();
    
    let get_query =  Object.assign(params, query);
    let schemaObj = ObjectModel.schema.obj;
    
    // params should be the unique key of table
    
    
    for (let key in get_query) {

        if (schemaObj[key]) {
            if (schemaObj[key].type === Date && parseInt(get_query[key]))
                get_query[key] = {$lte: new Date(parseInt(get_query[key]))};
        } else
            delete get_query[key];
    }
    
    console.log("get_query", get_query);

    ObjectModel.find(get_query)
            .sort({'timestamp': -1})
            .limit(1)
            .exec((err, objects) => {
                if (err)
                    deferred.reject(err);
                deferred.resolve(objects);
            });

    return deferred.promise;
}

function post_method(body = {}) {

    const deferred = Q.defer();

    var newObj = {};
    var priKey = {};

    let schemaObj = ObjectModel.schema.obj;
    
    body.timestamp = new Date();

    for (let key in body) {

        if (schemaObj[key]) {
            newObj[key] = body[key];
            if (schemaObj[key].unique)
                priKey[key] = body[key];
        }
    }

    //console.log("processing post : ", newObj, "priKey", priKey);

    ObjectModel.findOneAndUpdate(
            priKey, // find a document with that filter
            newObj, // document to insert when nothing was found
            {upsert: true, new : true}, // options
            (err, savedObject) => { //cb
                if (err)
                    deferred.reject(err);
                console.log("savedObject",savedObject);
                deferred.resolve(savedObject);
            }
    );


    return deferred.promise;
}