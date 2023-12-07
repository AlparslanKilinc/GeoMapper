const {
    RegionData,
    MapGraphicsData
} = require('../models/map-graphicsdata-model');
const Map = require('../models/map-model')


//if map is not found, return an error
//if map is found but graphics data is null, create a new one
//if map is found and graphics data is not null, update it
const addChoroplethMapGraphics = async (req, res) => {
    try {
        const {mapId, properties, name, colorByProperty, propertyNames} = req.body;

        const map = Map.findById(mapId);
        if(!map){
            return res.status(404).send({ message: 'Map not found' });
        }
        if(map){
            if(map.graphicsDataId == null) {
                const newRegionData = new RegionData({ mapId, properties, name });
                await newRegionData.save();

                const newGraphicsData = new MapGraphicsData({ mapId, regions: [newRegionData] });
                await newGraphicsData.save();

            }
        }

    }
};

module.exports = {addChoroplethMapGraphics };
