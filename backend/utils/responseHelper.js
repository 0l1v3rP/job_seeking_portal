function handleResponseSuccess(req, res, next){
    const payload = res.locals.payload;
    res.status(200).json(payload);
}

function handleResponseError(err, req, res, next){
    const code = err.code || 500; 
    const message = err.message || 'Internal Server Error'; 
    const name = err.name || 'ServerError'; 
    console.error(`${name} ${message}`);
    res.status(code).json({ error: message });   
}

async function handleResponseAsync(action, next) {
    try {
        await action();
        next()
    } catch(err) {
        next(err);
    }
}

function handleResponseSync(action, next) {
    try {
        action();
        next()
     } catch(err) {
        next(err);
     }
}

function payload(payload, res) {
    res.locals.payload = payload;
}


module.exports = {
    handleResponseSuccess,
    handleResponseError,
    handleResponseAsync,
    handleResponseSync,
    payload
}

