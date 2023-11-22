const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const home = require('./routers/homeRouter'); 
const auth = require('./routers/authRouter')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions)); 
app.use(home);
app.use(auth);

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

