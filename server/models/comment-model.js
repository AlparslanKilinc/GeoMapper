const mongoose = require("mongoose");;
const {schema: mapSchema} = require("./map-model");

const commentSchema = new mongoose.Schema({
    mapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: mapSchema,
        required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    text: { type: String, required: true },
    date_posted: { type: Date, required: true },
});
module.exports = mongoose.model("comment", commentSchema);