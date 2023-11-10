const mongoose = require("mongoose");
const {schema: userSchema} = require("./user-model");
const {schema: mapSchema} = require("./map-model");

const commentSchema = new mongoose.Schema({
    mapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: mapSchema,
        required: true,
    },
    author: userSchema,
    text: { type: String, required: true },
    date_posted: { type: Date, required: true },
    replies: [{ type:[commentSchema], required: false}],
    is_reply: { type: Boolean, required: true, default: false},
});
module.exports = mongoose.model("comment", commentSchema);