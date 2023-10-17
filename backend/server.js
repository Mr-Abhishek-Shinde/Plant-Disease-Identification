require('dotenv').config();

const express = require('express')
const diseasesRoutes = require('./routes/diseases')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')

const app = express()

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/diseases', diseasesRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.set("strictQuery", false);  // this is added to remove deprecation warning
mongoose.connect(process.env.MONGO_URL)
    .then((result) => {
        // Listen for requests:
        app.listen(process.env.PORT, () => {
        console.log('Connected to db and Listening on port', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })
