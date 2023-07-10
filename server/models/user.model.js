const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema(
  {
    personalID: {
      type: String,
      required: [true, "This field is required"],
    },
    photo: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },
    // demoMoney: {
    //   type: Number,
    //   required: [true, "Initial money is required"]
    // },
    coins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coin'
    }],
    admin: {
      type: Boolean,
      default: 'false'
  },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    console.log(this.password)
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);