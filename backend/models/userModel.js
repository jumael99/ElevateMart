import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z ]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid name!`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    address: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("verificationCode") || this.isVerified) {
    return next();
  }

  // Generate a salt and hash the verificationCode
  const salt = await bcrypt.genSalt(10);
  this.verificationCode = await bcrypt.hash(this.verificationCode, salt);
  next();
});

userSchema.methods.verifyVarificationCode = async function (
  verifyCode,
  databaseCode
) {
  return await bcrypt.compare(verifyCode, databaseCode);
};

const User = mongoose.model("User", userSchema);

export default User;
