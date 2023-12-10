const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  firstName: { type: String, required: true, minlength: 3 },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  passwordHash: {
    type: String,
    required: function () {
      return !this.googleUserId;
    }
  },
  email: { type: String, required: true, unique: true },
  publishedMaps: [{ type: ObjectId, ref: 'Map' }],
  draftedMaps: [{ type: ObjectId, ref: 'Map' }],
  bookmarkedMaps: [{ type: ObjectId, ref: 'Map' }],
  profileCreated: { type: Date, default: Date.now },
  bio: { type: String, default: '' },
  profilePicPath: { type: String, default: '' },
  googleUserId: { type: String, unique: true, default: '' }
});

module.exports = mongoose.model('User', UserSchema);
