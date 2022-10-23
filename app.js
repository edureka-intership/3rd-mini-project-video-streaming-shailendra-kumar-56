const showRouter = require('./routes/shows');

const express = require('express');
const app = express();

app.use('/', showRouter);
const mongoose = require('mongoose');

const port = 8500;
const hostname = 'localhost';
const dbUrl = 'mongodb://127.0.0.1:27017/netflix';
const atlasDbUrl = 'mongodb+srv://sail56:ZqnYz60dEcoJawp4@zomato.snbvepr.mongodb.net/netflix?retryWrites=true&w=majority'

mongoose.connect(atlasDbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
})

    .then(res => {
        app.listen(port, hostname, () => {
            console.log(`Server is running at ${hostname}:${port}`)
        });
    })
    .catch(err => console.log(err));
