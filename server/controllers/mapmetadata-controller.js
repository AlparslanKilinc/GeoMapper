const MapMetadata = require('../models/map-metadata-model');
const Map = require('../models/map-model')
const User = require('../models/user-model')
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

const getDraftedMetaData= async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        const metadataPromises = user.draftedMaps.map(async(draftedMapId) => {
            const map = await Map.findById(draftedMapId);
            if (!map) {
                return null;
            }
            const metadata = await MapMetadata.findById(map.metadataId);
            return metadata
        });
        const metadataArray = await Promise.all(metadataPromises);
        res.json(metadataArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {addMetaData, getDraftedMetaData};
