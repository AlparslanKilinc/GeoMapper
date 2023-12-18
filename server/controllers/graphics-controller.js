const GraphicsModel = require('../models/map-graphicsdata-model.js');

const saveMapGraphicsData = async (req, res) => {
  const mapGraphics = req.body;
  const newGraphics = new GraphicsModel(mapGraphics);
  const { _id } = await newGraphics.save();
  res.json({ _id });
};

const updateMapGraphicsDataById = async (req, res) => {
  const mapGraphics = req.body;
  const mapGraphicsId = req.params.mapGraphicsId;
  delete mapGraphics._id;
  const updatedGraphics = await GraphicsModel.findOneAndUpdate({_id:mapGraphicsId}, mapGraphics, { new: true });
  res.json(updatedGraphics);
};

const getMapGraphicsDataById = async (req, res) => {
  const mapGraphicsId = req.params.mapGraphicsId;
  const mapGraphics = await GraphicsModel.findById(mapGraphicsId);
  res.json(mapGraphics);
};

const deleteMapGraphicsById = async(req, res) =>{
  try {
    const mapGraphicsIdObject = req.body;
    const mapGraphicsId = Object.keys(mapGraphicsIdObject)[0];
    const deletedMapGraphics = await GraphicsModel.findByIdAndDelete(mapGraphicsId);
    if (!deletedMapGraphics) {
      return res.status(404).json({ message: 'Map graphics not found' });
    }
    res.status(200).json({ message: 'Map graphics deleted successfully' });
  } catch (error) {
    console.error('Error deleting map graphics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports = { saveMapGraphicsData, updateMapGraphicsDataById, getMapGraphicsDataById, deleteMapGraphicsById };
