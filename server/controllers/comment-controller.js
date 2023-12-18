const Map = require('../models/map-model'); // assuming you have a Map model
const User = require('../models/user-model'); // assumng you have a User model
const Comment = require('../models/comment-model');

const addComment = async (req, res) => {
    try{
     const {
         mapId,
         authorUserName,
         authorProfilePicture,
         authorId,
         text,
         date_posted,
    } = req.body;

    const map = await Map.findById(mapId);
    if (!map) {
        throw new Error('Map not found');
    }
    const newComment = new Comment({
        mapId: map._id,
        authorUsername: authorUserName,
        authorProfilePicture: authorProfilePicture,
        authorId: authorId,
        text: text,
        date_posted: date_posted,
    });
    await newComment.save();
    map.comments.push(newComment._id);
    await map.save();
    res.status(200).send(newComment);
    } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

const getMapComments = async (req, res) => {
    try{
        const mapId = req.params.mapId
        const map = await Map.findById(mapId);
        if (!map) {
            throw new Error('Map not found');
        }
        const comments = map.comments;
        const commentObjects = await Promise.all(map.comments.map(commentId =>
            Comment.findById(commentId)
        ));
        res.status(200).send( commentObjects);
    } catch (error) {
        console.error('Map Not Found:', error);
        throw error;
    }
};





module.exports = {
    addComment,
    getMapComments
};
