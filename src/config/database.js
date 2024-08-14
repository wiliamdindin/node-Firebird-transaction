import firebird from "node-firebird";

const dbOptions = {
    host: 'localhost',
    port: 26350,
    database: '/Firebird/Backups/Naturagua/CONTABIL.FDB',    
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: true, // set to true to lowercase keys
    role: null,            // default    
    pageSize: 4096        // default when creating database
};

function executeQuery(ssql, params, callback){

    firebird.attach(dbOptions, function(err, db) {
            
        if (err) {
            return callback(err, []); 
        } 

        db.query(ssql, params, function(err, result) {
            
            db.detach();

            if (err) {
                return callback(err, []);
            } else {
                return callback(undefined, result);
            }
        });

    });
}

async function executeQueryTrx(transaction, ssql, parameters){

    return new Promise(function (resolve, reject) {
        transaction.query(ssql, parameters, function(err, result){
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

export {executeQuery, firebird, dbOptions, executeQueryTrx};