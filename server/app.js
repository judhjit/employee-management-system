const express = require('express');

// const path = require('path');

const cookieParser = require('cookie-parser');

const cors = require('cors');

const db = require('./data/database');

const errorHandlerMiddleware = require('./middlewares/error-handler');

const checkAuthStatusMiddleware = require('./middlewares/check-auth');

const verifyJWTTokenMiddleware = require('./middlewares/verify-jwt-token');

const protectRoutesMiddleware = require('./middlewares/protect-routes');

const logger = require('./logger/index');


const corsOptions = {
    origin: process.env.CLIENT_URL,
    // origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Cookie', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin', 'Origin', 'X-Requested-With', 'Accept', 'withCredentials'],
    optionsSuccessStatus: 200
};

const corsMiddleware = cors(corsOptions);

const adminRoutes = require('./routes/admin-routes');
const authRoutes = require('./routes/auth-routes');
const baseRoutes = require('./routes/base-routes');
const newsAdminRoutes = require('./routes/news-admin-routes');
const userRoutes = require('./routes/user-routes');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: corsOptions
});

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'build')));

// app.use(express.static('public'));
// app.use('/products/assets', express.static('product-data'));


app.use(express.urlencoded({ extended: false })); //parses incoming requests with urlencoded payloads and is based on body-parser

app.use(express.json());

app.use(corsMiddleware);

app.use(cookieParser()); //parses cookies and adds them to req.cookies


app.use(baseRoutes);

app.use(authRoutes); //authentication related routes


app.use(verifyJWTTokenMiddleware); //checks if token is valid or not and adds userId to req object if valid token is present in request header Authorization field

app.use(checkAuthStatusMiddleware); //checks if user is logged in or not

app.use('/user', userRoutes); //registering a middleware triggered for all incoming requests with /user prefix

app.use(protectRoutesMiddleware); //registering a middleware to protect routes requiring authentication and authorization

app.use('/newsadmin', newsAdminRoutes); //registering a middleware triggered for all incoming requests with /newsAdmin prefix

app.use('/admin', adminRoutes); //registering a middleware triggered for all incoming requests with /admin prefix

app.use(errorHandlerMiddleware);

db.connect().then(() => {
    logger.info(`Connected to database ${process.env.DB_DATABASE} on port ${process.env.DB_PORT} at ${process.env.DB_HOST}`);
}).catch((err) => {
    logger.error(err);
});


const port = process.env.DEV_PORT || process.env.PROD_PORT || 3000;

server.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});
// app.listen(port, () => {
//     logger.info(`Server listening on port ${port}`);
// });

io.on('connection', (socket) => {
    logger.info('User connected', socket.id);
    socket.on('disconnect', () => {
        logger.info('Socket disconnected', socket.id);
    });
});

module.exports = app;
