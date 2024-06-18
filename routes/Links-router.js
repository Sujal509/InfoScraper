const express = require('express');
const { module1, module2, module3,databaseui } = require('../controllers/links.controller');

const router = express.Router();

router.get('/module1/getdata', module1);
router.get('/module2/geturl', module2);
router.get('/module3/getdatapython',module3);
router.get('/records',databaseui);

module.exports = router;