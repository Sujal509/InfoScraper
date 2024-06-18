const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/module1', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/geturl_method1.html'));
});

router.get('/module2', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/geturl_method2.html'));
});

router.get('/module3',(req,res)=>{
    return res.sendFile(path.join(__dirname,'../public/py_page.html'));
});

router.get('/showdatabase', (req, res) => {
    return res.sendFile(path.join(__dirname, '../public/database_ui.html'));
});

module.exports = router;