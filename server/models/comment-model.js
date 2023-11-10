const mongoose = require("mongoose");
const {schema: userSchema} = require("./user-model");

const comments = new Schema({
    author: userSchema,
    text: { type: String, required: true },
    date_posted: { type: Date, required: true },
    replies: [{ type:[comments], required: false}],
    is_reply: { type: Boolean, required: true, default: false},
});