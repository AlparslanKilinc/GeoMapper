const MapStyles = require('../models/map-stylesdata-mode-model.js');


const getMapStylesById = async (req,res) => {
    try {
        const { id } = req.params;
        const styles = await MapStyles.findById(id);

        if (!styles) {
            return res.status(404).send({ message: 'Styles not found' });
        }

        res.status(200).send(styles);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving map Styles' });
    }
}



module.exports = {getMapStylesById, updateMapStylesById };
