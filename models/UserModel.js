const mongoose = require("mongoose");
//make pass it invisble
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});


// below for password same as in db #1
UserSchema.methods.comparePassword = async function (
  enteredPassword,
  callback
) {
        callback(null, enteredPassword===this.password);

};
// end #1


// below for password with hash as in db #2

// await bcrypt.compare(
//     enteredPassword,
//     this.password,
//     function (error, isMatch) {
//       if (error) return callback(error);
//       callback(null, isMatch);
//     }
//   );
// };
// #2

const User = mongoose.model("User", UserSchema);
module.exports = User;
