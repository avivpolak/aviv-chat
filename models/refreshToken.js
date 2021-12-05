const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
