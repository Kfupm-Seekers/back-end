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
mongoose.connect('mongodb://localhost/seeker', { useNewUrlParser: true })

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