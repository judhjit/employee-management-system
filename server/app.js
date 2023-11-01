const express = require('express');

// const path = require('path');

const cookieParser = require('cookie-parser');

const cors = require('cors');

const db = require('./data/database');

const expressSession = require('express-session');

const errorHandlerMiddleware = require('./middlewares/error-handler');

const checkAuthStatusMiddleware = require('./middlewares/check-auth');

const verifyJWTTokenMiddleware = require('./middlewares/verify-jwt-token');

const refreshTokenController = require('./controllers/refresh-token-controller');

const createSessionConfig = require('./config/session');

const protectRoutesMiddleware = require('./middlewares/protect-routes');

// const notFoundMiddleware = require('./middlewares/not-found');

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Cookie', 'Access-Control-Allow-Credentials'],
    optionsSuccessStatus: 200
};

const corsMiddleware = cors(corsOptions);


const authRoutes = require('./routes/auth-routes');
const baseRoutes = require('./routes/base-routes');
const deskRoutes = require('./routes/desk-routes');
const newsRoutes = require('./routes/news-routes');
const newsAdminRoutes = require('./routes/news-admin-routes');

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'build')));

// app.use(express.static('public'));
// app.use('/products/assets', express.static('product-data'));


app.use(express.urlencoded({ extended: false })); //parses incoming requests with urlencoded payloads and is based on body-parser

app.use(express.json());

app.use(corsMiddleware);


const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(cookieParser()); //parses cookies and adds them to req.cookies




app.use(baseRoutes);
app.use(authRoutes);


app.post('/refresh', refreshTokenController.handleRefreshToken);


app.use(verifyJWTTokenMiddleware); //checks if token is valid or not and adds userId to req object if valid token is present in request header Authorization field

app.use(checkAuthStatusMiddleware); //checks if user is logged in or not

app.use('/desks', deskRoutes); //registering a middleware triggered for all incoming requests with /desks prefix

app.use('/news', newsRoutes); //registering a middleware triggered for all incoming requests with /news prefix

app.use(protectRoutesMiddleware); //registering a middleware to protect routes requiring authentication and authorization

app.use('/newsAdmin', newsAdminRoutes); //registering a middleware triggered for all incoming requests with /newsAdmin prefix
// app.get('/admin', (req, res, next) => {
//     res.send('Admin page');
// });

app.use(errorHandlerMiddleware);

db.connect().then(() => {
    console.log(`Connected to database ${process.env.DB_DATABASE} on port ${process.env.DB_PORT} at ${process.env.DB_HOST}`);
}).catch((err) => {
    console.log(err);
});


const port = process.env.DEV_PORT || process.env.PROD_PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
