import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close.js";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';
import {forkMap} from '../../redux-slices/mapSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ForkForm ({ open, onClose, map}) {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mapTitle, setMapName] = useState(map.title);
    const [mapDescription, setDescription] = useState(map.description);
    const handleFork = () =>{
        const mapData = {
            mapId: map._id,
            geoDataId: map.geoDataId,
            graphicsDataId: map.graphicsDataId,
            stylesDataId: map.stylesDataId,
            authorId: map.authorId,
            authorUserName: map.authorUserName,
            newAuthorId: user.id,
            newAuthorUserName: user.userName,
            newTitle: mapTitle,
            newDescription: mapDescription
        };
        dispatch(forkMap(mapData))
        navigate('/profile')
    }

    const handleTitleChange = (event) => {
        setMapName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return(
        <div id = "fork-form">
            <Dialog open={open} onClose={onClose}>
                <IconButton sx = {{
                    ml:'400px',
                }}>
                    <CloseIcon onClick={onClose} />
                </IconButton>
                <DialogTitle sx ={{
                    mt: '-45px',
                    ml: '-5px',
                    pb: '5px'
                }}>Fork A Map</DialogTitle>
                <DialogContent>
                    <DialogContentText sx = {{
                        typography: 'caption',
                        color: "dimgrey",
                        ml: '-5px',
                    }}>
                        A fork is a copy of a map. Your changes wont effect the original users map
                    </DialogContentText>

                    <DialogContentText sx = {{
                        fontStyle: 'italic',
                        typography: 'caption',
                        color: "dimgrey",
                        ml: '-5px',
                    }}>
                        Required fields are marked with an asterisks (*).
                    </DialogContentText>
                    <FormControl sx = {{mt: '20px'}}>
                        <FormLabel >Map Name*</FormLabel>
                        <TextField
                          value = {mapTitle}
                          onChange={handleTitleChange}
                          sx = {{
                            width: 400,
                            mb: '5px'
                        }}></TextField>
                        <FormLabel sx = {{mt: '20px'}}>Description(Optional)</FormLabel>
                        <TextField  multiline rows={6}
                                    value={mapDescription}
                                    onChange={handleDescriptionChange}
                       sx = {{
                            width: 400,
                            mb: '5px'
                            }}></TextField>
                        <Button sx = {{
                            backgroundColor: 'var(--main-color)',
                            '&:hover': {backgroundColor: 'var(--dark-color)'},
                            color:'white',
                            width:'75px',
                            mt: '10px',
                            mb: "15px",
                            borderRadius: '20px'}}
                            onClick = {handleFork}>
                            Fork
                        </Button>


                    </FormControl>

                </DialogContent>
            </Dialog>
        </div>




    );
}