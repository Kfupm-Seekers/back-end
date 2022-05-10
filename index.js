const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const postRoutes = require('./routes/post');
const courseRoutes = require('./routes/course');
const treeRoutes = require('./routes/tree');
const Course = require("./models/course");
const Path = require("./models/pathModel");

// var bodyParser = require('body-parser'); 
var request = require('request-promise'); 

const userRouter = require("./routes/users");


const FavouriteListModel = require("./models/FavouriteListModel");
const BookmarkListModel = require("./models/BookmarkListModel");
//path
const FavouriteListModelPath = require("./models/FavouriteListModelPath");
const BookmarkListModelPath = require("./models/BookmarkListModelPath");
//path end

const passport = require("passport");
const session = require("express-session");
const authConfig = require("./auth_config.json");


require("./utils/passport");

const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb+srv://team:l9irUEeUegtujTPj@cluster0.aelov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })

// mongoose.connect('mongodb+srv://javascript:javascript123@cluster0.gahhe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
   
    mongoose.connect('mongodb+srv://seeker:DGjcdNh0FhiNS750@cluster0.rslrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })

const allowedOrigins = ["http://localhost:3000", "http://localhost:80"];

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
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
  session({
    secret: "pa$$word1234",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//auth

app.use("/users", userRouter);


// auth end

app.use('/api/post', postRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/tree', treeRoutes);
app.use(errorHandler);

// in db
//module.exports= mongoose.model('Course',CourseSchema);





//======================courses get======================
app.get(
  "/courses",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let favourites = await FavouriteListModel.findOne({ user_id: req.user.id });
    let bookmarks = await BookmarkListModel.findOne({ user_id: req.user.id });

    console.log(favourites);
    let foundCourses = await Course.find({});
    console.log(foundCourses);

    let courses = [...foundCourses];
    if (favourites && bookmarks) {
      courses = courses.map((el) => ({
        ...el._doc,
        isFavourite: favourites.list.includes(el._doc._id),
        isBookmarked: bookmarks.list.includes(el._doc._id),
      }));
    }

    console.log(courses);
    if (foundCourses) {
      return res.status(200).json({
        courses,
      });
    }
  }
);


//==================Paths get=============
app.get(
    "/paths",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        let favouritesPath = await FavouriteListModelPath.findOne({ user_id: req.user.id });
        let bookmarksPath = await BookmarkListModelPath.findOne({ user_id: req.user.id });

        console.log(favouritesPath);
        let foundPaths = await Path.find({});
        console.log(foundPaths);
        let paths = [...foundPaths];
        if (favouritesPath && bookmarksPath) {
            paths = paths.map((el) => ({
                ...el._doc,
                isFavouritePath: favouritesPath.list.includes(el._doc._id),
                isBookmarkedPath: bookmarksPath.list.includes(el._doc._id),
            }));
        }

        console.log(paths);
        if (foundPaths) {
            return res.status(200).json({
                paths,
            });
        }
    }
);

// ===============favourite  courses ==================

app.put(
  "/courses/favourite/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    FavouriteListModel.updateOne(
      { user_id: req.user.id },
      { $addToSet: { list: req.params.id } },
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "could not set course as favourite" });
        }
        return res
          .status(200)
          .json({ message: "course added to favourites successfully" });
      }
    );
  }
);


app.put(
  "/courses/favourite/remove/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    FavouriteListModel.updateOne(
      { user_id: req.user.id },
      { $pull: { list: req.params.id } },
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "could not remove course from favourite" });
        }
        return res
          .status(200)
          .json({ message: "course removed from favourites successfully" });
      }
    );
  }
);

// ===============favourite  paths ==================
app.put(
    "/paths/favourite/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        FavouriteListModelPath.updateOne(
            { user_id: req.user.id },
            { $addToSet: { list: req.params.id } },
            (err, results) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "could not set path as favourite" });
                }
                return res
                    .status(200)
                    .json({ message: "path added to favourites successfully" });
            }
        );
    }
);


app.put(
    "/paths/favourite/remove/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        FavouriteListModelPath.updateOne(
            { user_id: req.user.id },
            { $pull: { list: req.params.id } },
            (err, results) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "could not remove path from favourite" });
                }
                return res
                    .status(200)
                    .json({ message: "path removed from favourites successfully" });
            }
        );
    }
);













// ===============bookmark  courses==================
app.put(
  "/courses/bookmark/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    BookmarkListModel.updateOne(
      { user_id: req.user.id },
      { $addToSet: { list: req.params.id } },
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "could not set course as bookmark" });
        }
        return res
          .status(200)
          .json({ message: "course added to bookmark successfully" });
      }
    );
  }
);


app.put(
  "/courses/bookmark/remove/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    BookmarkListModel.updateOne(
      { user_id: req.user.id },
      { $pull: { list: req.params.id } },
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "could not remove course from bookmark" });
        }
        return res
          .status(200)
          .json({ message: "course removed from bookmark successfully" });
      }
    );
  }
);


// ===============bookmark  paths==================
app.put(
    "/paths/bookmark/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        BookmarkListModelPath.updateOne(
            { user_id: req.user.id },
            { $addToSet: { list: req.params.id } },
            (err, results) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "could not set path as bookmark" });
                }
                return res
                    .status(200)
                    .json({ message: "path added to bookmark successfully" });
            }
        );
    }
);


app.put(
    "/paths/bookmark/remove/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        BookmarkListModelPath.updateOne(
            { user_id: req.user.id },
            { $pull: { list: req.params.id } },
            (err, results) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "could not remove path from bookmark" });
                }
                return res
                    .status(200)
                    .json({ message: "path removed from bookmark successfully" });
            }
        );
    }
);















//====== for pages of Fav and bookmark to get courses

app.get(
    "/courses/favourites",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        let favourites = await FavouriteListModel.findOne({ user_id: req.user.id });
        let bookmarks = await BookmarkListModel.findOne({ user_id: req.user.id });
        console.log(favourites);
        let foundCourses = await Course.find({
            _id: { $in: favourites.list },
        });
        console.log(foundCourses);
        let courses = [...foundCourses];
        if (favourites && bookmarks) {
            courses = courses.map((el) => ({
                ...el._doc,
                isFavourite: true,
                isBookmarked: bookmarks.list.includes(el._doc._id),
            }));
        }

        console.log(courses);
        if (foundCourses) {
            return res.status(200).json({
                courses,
            });
        }
    }
);
app.get(
    "/courses/bookmarks",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        let favourites = await FavouriteListModel.findOne({ user_id: req.user.id });
        let bookmarks = await BookmarkListModel.findOne({ user_id: req.user.id });
        console.log(favourites);
        let foundCourses = await Course.find({
            _id: { $in: bookmarks.list },
        });
        console.log(foundCourses);
        let courses = [...foundCourses];
        if (favourites && bookmarks) {
            courses = courses.map((el) => ({
                ...el._doc,
                isBookmarked: true,
                isFavourite: favourites.list.includes(el._doc._id),
            }));
        }

        console.log(courses);
        if (foundCourses) {
            return res.status(200).json({
                courses,
            });
        }
    }
);


//===== paths
//====== for pages of Fav and bookmark to get paths

app.get(
    "/paths/favourites",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        let favouritesPath = await FavouriteListModelPath.findOne({ user_id: req.user.id });
        let bookmarksPath = await BookmarkListModelPath.findOne({ user_id: req.user.id });
        console.log(favouritesPath);
        let foundPaths = await Path.find({
            _id: { $in: favouritesPath.list },
        });
        console.log(foundPaths);
        let paths = [...foundPaths];
        if (favouritesPath && bookmarksPath) {
            paths = paths.map((el) => ({
                ...el._doc,
                isFavouritePath: true,
                isBookmarkedPath: bookmarksPath.list.includes(el._doc._id),
            }));
        }

        console.log(paths);
        if (foundPaths) {
            return res.status(200).json({
                paths,
            });
        }
    }
);
app.get(
    "/paths/bookmarks",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        let favouritesPath = await FavouriteListModelPath.findOne({ user_id: req.user.id });
        let bookmarksPath = await BookmarkListModelPath.findOne({ user_id: req.user.id });
        console.log(favouritesPath);
        let foundPaths = await Path.find({
            _id: { $in: bookmarksPath.list },
        });
        console.log(foundPaths);
        let paths = [...foundPaths];
        if (favouritesPath && bookmarksPath) {
            paths = paths.map((el) => ({
                ...el._doc,
                isBookmarkedPath: true,
                isFavouritePath: favouritesPath.list.includes(el._doc._id),
            }));
        }

        console.log(paths);
        if (foundPaths) {
            return res.status(200).json({
                paths,
            });
        }
    }
);




// app.get("/paths/bookmarks", passport.authenticate("jwt", { session: false }), async (req, res) => {
app.put('/postdatatoFlask', passport.authenticate("jwt", { session: false }) , async (req, res) => { 

    // userID: req.user.id
    // courseID = findById(req.params.id, 'courseID').exec()
    // sent1 = findById(req.params.id, 'description').exec()

    var originalData = {
        userID: req.user.id,
        questionID: req.params.id,
        courseID: req.body.courseID, //courseID,
        score: "",
        sent1: req.body.sent1,
        sent2: req.body.sent2,
    
        // score:"" // to be taken from the flask api can obtained by returndata['result']
    }
    
    // var data = { // this variable contains the data you want to send  
    //     sent1: originalData['sent1'],
    //     sent2: originalData['sent2'],
    // } 

    var data = { // this variable contains the data you want to send  
        sent1: req.body.sent1,
        sent2: req.body.sent2,
    } 
 

    console.log(data);

    var options = { 
        method: 'POST', 
        uri: 'http://127.0.0.1:5000/predict', 
        body: data, 
        json: true // Automatically stringifies the body to JSON 
    }; 
     
    var returndata; 
    var sendrequest = await request(options) 
    .then(function (parsedBody) { 
        console.log(parsedBody); // parsedBody contains the data sent back from the Flask server 
        returndata = parsedBody; // do something with this data, here I'm assigning it to a variable. 
    }) 
    .catch(function (err) { 
        console.log(err); 
    }); 

    originalData['score'] = returndata['result']


    if(returndata['result'] == 0){
        print("data is")
        
        console.log(originalData)

        BookmarkListModel.updateOne(
            { user_id: req.user.id },
            { $addToSet: { list: req.body.courseID } },
            (err, results) => {
              if (err) {
                return res
                  .status(500)
                  .json({ message: "could not set course as bookmark" });
              }
              return res
                .status(200)
                .json({ message: "course added to bookmark successfully" });
            }
          );
        

    }


     
    res.send(returndata['result']); 
}); 











app.listen(80, () => {
    console.log('Server is running on port 80');
});



const pathRoutes = require('./routes/PathsDes.js');
const profileRoutes = require('./routes/Profile.js');

// parse application/json
app.use('/PathDescription', pathRoutes);
app.use(profileRoutes)

