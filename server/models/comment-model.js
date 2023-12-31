const mongoose = require("mongoose");;
const {schema: mapSchema} = require("./map-model");


const commentSchema = new mongoose.Schema({
  mapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Map',
    required: true
  },
  authorUsername: { type: String, required: true },
  authorProfilePicture: { type: String, default: '' },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: { type: String, required: true },
  date_posted: { type: Date, required: true }
  /*replies: [
    {
      replyString: { type: String, required: true },
      replierName: { type: String, required: true },
      replierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: mapSchema,
        required: true,
    },
      
    }
  ],
  is_reply: { type: Boolean, required: true, default: false }*/

});
module.exports = mongoose.model('Comment', commentSchema);
