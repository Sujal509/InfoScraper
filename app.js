require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const LinksRouter = require('./routes/Links-router');
const PageRouter = require('./routes/Page-router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('./public'));
app.use(cors({ origin: true }));

app.use('/', PageRouter);
app.use('/', LinksRouter);


const databaseURL = process.env.DATABASE_URL;
mongoose.connect(databaseURL)
    .then(() => {
        console.log('Database connected ✔');
        app.listen(PORT, () => {
            console.log(`App is listening on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(`Error:- ${err.message}`);
    });