function handleResponseSuccess(req, res, next){
    const payload = res.locals.payload;
    res.status(200).json(payload);
}

function handleResponseError(err, req, res, next){
    const code = err.code || 500; 
    const message = err.message || 'Internal Server Error'; 
    const name = err.name || 'ServerError'; 
    const errMessage = `${name}: ${message}`;
    console.error(errMessage);
    res.status(code).json({ error: errMessage });   
}

// sends response to appropriate response handling middlewares
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

function payload(payload) {
    res.locals.payload = payload;
}


module.exports = {
    handleResponseSuccess,
    handleResponseError,
    handleResponseAsync,
    handleResponseSync,
    payload
}

