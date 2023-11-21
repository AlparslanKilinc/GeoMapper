const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  firstName: { type: String, required: true, minlength: 3 },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  privateMaps: [{ type: ObjectId, ref: 'map' }],
  publishedMaps: [{ type: ObjectId, ref: 'map' }],
  draftedMaps: [{ type: ObjectId, ref: 'map' }],
  bookmarkedMaps: [{ type: ObjectId, ref: 'map' }],
  profileCreated: { type: Date, default: Date.now },
  bio: { type: String, default: '' },
  profilePicPath: { type: String, default: '' }
});

module.exports = mongoose.model('user', UserSchema);
