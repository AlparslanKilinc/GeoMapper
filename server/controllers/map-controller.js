const Map = require('../models/map-model');
const mongoose = require("mongoose");

const addMap = async (req, res) => {
    try {
        const newMap = new Map();
        const savedMap = await newMap.save();
        return res.status(201).json(savedMap);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error adding/updating the map', details: error.message });
    }
};

const updateMap = async (req, res) => {
    try {
        const{mapId, graphicsId, stylesId, metadataId, geoId} = req.body
        console.log("in map with data conttroller")
        const existingMap = await Map.findOneAndUpdate(
            { _id: mapId },
            {
                $set: {
                    graphicsDataId: graphicsId,
                    stylesDataId: stylesId,
                    metadataId: metadataId,
                    geoData: geoId,
                },
            },
            { new: true } // Return the modified document
        );
        console.log("existing map" + existingMap)
        if (!existingMap) {
            return res.status(404).json({ error: 'Map not found' });
        }
        console.log('Updated map:', existingMap);
        return res.status(200).json(existingMap);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating the map', details: error.message });
    }
};
/*const getMapById = async(req, res) =>{
    try{
        const {id} = req.body;
        const map = await Map.findById(id)
        if (!map) {
            return res.status(404).send({ message: 'Map not found' });
        }
        else{
            return res.status(200).send(map)
        }
    }catch(error){
        res.status(500).send({ message: 'Error retrieving Map' });
    }
}

const deleteMapById = async(req,res) =>{
    try{
        const {id} = req.body;
        const map = await Map.findByIdAndDelete(id)
        if (!map) {
            return res.status(404).send({ message: 'Map not found' });
        }
        else{
            return res.status(200).send({message: "Map successfully deleted"})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error deleting map' });

    }
}*/


module.exports = { addMap, updateMap };
