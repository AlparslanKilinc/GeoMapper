const MapMetadata = require('../models/map-metadata-model');

const addMetaData = async (req,res) => {
    try {
        console.log("in meta data controler")
        const {author,mapId, description,tags,mapGraphicsType, title} = req.body;
        console.log(req.body)
        console.log(author)
        const newMetaData = new MapMetadata({
            mapId: mapId,
            author: author,
            description: description,
            tags: tags,
            mapGraphicsType: mapGraphicsType,
            title: title,
        })
        console.log("mapId:", mapId);
        console.log("author:", author);
        console.log("newmeta data")
        console.log(newMetaData)
        const savedMetaData = await newMetaData.save()
        console.log("saved meta data")
        console.log(savedMetaData)
        return res.status(200).send(savedMetaData)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error creating map meta data' });
    }
}

module.exports = {addMetaData};
