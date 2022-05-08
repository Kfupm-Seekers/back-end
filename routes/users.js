// ===========imports=================================================
const express = require("express");
const router = express.Router();
// here below we call email and password according to thier tpye defined there
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const FavouriteListModel = require("../models/FavouriteListModel");
const BookmarkListModel = require("../models/BookmarkListModel");
const Joi = require("joi");
const passport = require("passport");
const JWTSECRET = `jghdhkurzsvboJH`;

//path
const FavouriteListModelPath = require("../models/FavouriteListModelPath");
const BookmarkListModelPath = require("../models/BookmarkListModelPath");
//path end


//Register
// ============== Register ==========================================
router.post("/register", async (req, res) => {
    console.log(req.body);
    const schema = Joi.object({
        password: Joi.string().min(6).max(30).required(),
        email: Joi.string()
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ["com"] },
            }),

        password2: Joi.ref("password"),
        name: Joi.string().required().min(3).max(20),
    });
    const options = {
        abortEarly: true, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        return res
            .status(400)
            .json({ status: "false", message: error.details[0].message });
    } else {
        req.body = value;
    }
    let { email, password, name } = req.body;

    let userWithSameEmail = await User.findOne({ email: email });
    if (userWithSameEmail) {
        return res
            .status(400)
            .json({ status: "false", message: "Email already used by another user" });
    }

    let createdUser = new User({

        email,
        password,
        name,
    });
    let createdUserResult = await createdUser.save();
    //==============

    let favourite_list = await FavouriteListModel.create({
        user_id: createdUserResult._id,
    });
    let bookmark_list = await BookmarkListModel.create({
        user_id: createdUserResult._id,
    });

    let favourite_listPath = await FavouriteListModelPath.create({
        user_id: createdUserResult._id,
    });
    let bookmark_listPath = await BookmarkListModelPath.create({
        user_id: createdUserResult._id,
    });
    //==============
    if (!bookmark_list || !favourite_list) {
        User.deleteOne({ _id: createdUser._id });
    }

    if (!bookmark_listPath || !favourite_listPath) {
        User.deleteOne({ _id: createdUser._id });
    }



    if (!createdUserResult) {
        return res
            .status(400)
            .json({ status: "false", message: "Error creating user" });
    } else {
        res.json({ status: "true", message: "registered successfully" });
    }
});

// **************** End Register *******************************

// end register














// =================Signin ========================================
router.post("/login", async (req, res, next) => {


// these for avoid errors (must be here)
  const options = {
    abortEarly: true,
    allowUnknown: true,
    stripUnknown: true
  };


  let user = await User.findOne({ email: req.body.email });
  //this below allow us if there is an error not exit the run in server
  if (!user) {
    return res.status(400).json({ status: "false", message: "Not registered" });
  }



  user.comparePassword(req.body.password, async (error, isMatch) => {

    // if the password in login not match error happen
      if (!isMatch) {
        return res
          .status(400)
          .json({ status: "false", message: "Wrong Password" });
      }



      //here
      let ObjectToSign = { iss: "qcmgeek", sub: user._id };
      let signedJWT = jwt.sign(ObjectToSign, JWTSECRET);
      return res.json({
        status: "true",
        message: "Success login",
        data: { token: signedJWT },
      });

  });
});


// ================== check user ===========================

router.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        return res.send("protected by user auth");
    }
);
// ===========================================================
// ================== get Profile ===========================
router.get(
    "/get_profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        if (req.user) {
            let mUser = await User.findById(
                req.user._id,
                "name phone email licenses"
            );
            if (!mUser) {
                return res
                    .status(400)
                    .json({ status: "false", message: " Error ! could not get user" });
            }
            return res.json({
                status: "true",
                message: "profile fetched successfully",
                data: mUser,
            });
        }
    }
);
module.exports = router;
