require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./routers/accountRouter');
const {connectToDatabase, disconnectFromDatabase } = require('./database/dbConnection');
const session = require('express-session');
const app = express();

const sessionSecret = process.env.YOUR_SESSION_SECRET || 'fallback-secret';

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3600000,
    //   sameSite: 'Strict',
    },
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions)); 
app.use(auth);

const port = process.env.PORT || 8000;

(async () => {
    try {
        await connectToDatabase();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        process.on('SIGINT', async () => {
            console.log('\nShutting down ...');
            await disconnectFromDatabase();
            process.exit(0);
        });
    } catch (error) {
        console.error('Error starting the application:', error);
        process.exit(1); 
    }
})();
