const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const User = require("../models/UserModel");
const JWTSECRET  = `jghdhkurzsvboJH`
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWTSECRET,
    },
    async (payload, done) => {
      try {
        User.findById(payload.sub).then((usr) => {
          if (!usr) {
            done(null, false);
          } else {
            done(null, usr);
          }
        });
      } catch (err) {
        done(err, false);
      }
    }
  )
);
