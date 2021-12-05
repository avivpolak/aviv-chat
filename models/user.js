const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      trim: true,
      required: true,
    },
    isConnected: {
      type: Boolean,
      trim: true,
      required: false,
    },
    bio: String,
    birthDate: Date,
  },

  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
