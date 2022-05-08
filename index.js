const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const postRoutes = require('./routes/post');
const courseRoutes = require('./routes/course');
const treeRoutes = require('./routes/tree');
const app = express();


// app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://team:l9irUEeUegtujTPj@cluster0.aelov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })

const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/post', postRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/tree', treeRoutes);
app.use(errorHandler);
app.listen(80, () => {
    console.log('Server is running on port 80');
});


// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import pathRoutes from './routes/PathsDes.js';
// import profileRoutes from './routes/Profile.js';

// const app = express()
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
// app.use(cors());
// // parse application/json
// app.use(bodyParser.json());
// app.use('/PathDescription', pathRoutes);
// app.use(profileRoutes)


// // app.listen(5000, () => console.log(`App listening at http://localhost:${5000}`))

// const CONNECTION_URL = 'mongodb+srv://Musab:Musab1234@swe418cluster.rlu7n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const PORT = process.env.PORT || 5000;
// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("connected to the MongoDB")
//         app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
//     })
//     .catch((err) => console.log(err.message));
