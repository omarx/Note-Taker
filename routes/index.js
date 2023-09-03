const webPages = require('./webPages');
const api=require('./apiRoutes')
const express = require('express');
const router = express.Router();  

//Order matters always have api routes above other routes
router.use('/api',api);
router.use('/', webPages);

module.exports = router;
