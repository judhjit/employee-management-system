const express = require('express');
// const path = require('path');

const router = express.Router();

//For react app something like this is coming up...
// router.get('/', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
// });

router.get('/', (req, res, next) => {
    res.send('Hello from base routes');
});

module.exports = router;
