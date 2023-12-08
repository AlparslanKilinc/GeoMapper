const MapMetadata = require('../models/map-metadata-model');
const Map = require('../models/map-model')
const mapMetadataSchema = MapMetadata.schema;
console.log(mapMetadataSchema.obj);
const addMetaData = async (req,res) => {
    try {
        const {author,mapId, description,tags,mapGraphicsType, title} = req.body;
        const newMetaData = new MapMetadata({
            mapId: mapId,
            author: author,
            description: description,
            tags: tags,
            mapGraphicsType: mapGraphicsType,
            title: title,
        })
        const savedMetaData = await newMetaData.save()
        return res.status(200).send(savedMetaData)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error creating map meta data' });
    }
}

const getMetaDataByMapId = async(req, res) => {
    try {
        const mapId = req.params.mapId;
        const metaData = await MapMetadata.findOne({ mapId: mapId });

        if (!metaData) {
            return res.status(404).json({ message: 'Metadata not found' });
        }

        res.json(metaData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {addMetaData, getMetaDataByMapId};
