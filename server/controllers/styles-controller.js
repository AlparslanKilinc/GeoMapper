const StylesModel = require('../models/map-stylesdata-model.js');

const saveMapStylesData = async (req, res) => {
  const mapStyles = req.body;
  newPlaylist = new StylesModel(mapStyles);
  const { _id } = await newPlaylist.save();
  res.json({ _id });
};

const updateMapStylesDataById = async (req, res) => {
  const mapStyles = req.body;
  const mapStylesId = req.params.mapStylesId;
  delete mapStyles._id;
  const updatedStyles = await StylesModel.findOneAndUpdate({_id:mapStylesId}, mapStyles, { new: true });
  res.json(updatedStyles);
};

const getMapStylesDataById = async (req, res) => {
  const mapStylesId = req.params.mapStylesId;
  const mapStyles = await StylesModel.findById(mapStylesId);
  res.json(mapStyles);
};

const deleteMapStylesById = async(req,res) =>{
  try{
    const mapStylesIdObject = req.body;
    const mapStylesId = Object.keys(mapStylesIdObject)[0];
    const deletedStyles = await StylesModel.findByIdAndDelete(mapStylesId)
    if(!deletedStyles){
      return res.status(400).json({message: "Map Styles Not Found"})
    }
    res.status(200).json({message: "Map Styles Deleted Successfully"})
  }catch(error){
    console.log("error deleteing map graphics " + error)
    res.status(500).json({message: "Internal Server Error"})
  }

}

module.exports = { saveMapStylesData, updateMapStylesDataById, getMapStylesDataById, deleteMapStylesById };
