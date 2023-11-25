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

export default function ForkForm ({ open, onClose, title}) {
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
                        <TextField sx = {{
                            width: 400,
                            mb: '5px'
                        }}></TextField>
                        <FormLabel sx = {{mt: '20px'}}>Description(Optional)</FormLabel>
                        <TextField  multiline rows={6}  sx = {{
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
                            borderRadius: '20px'}}>
                            Fork
                        </Button>



                    </FormControl>

                </DialogContent>
            </Dialog>
        </div>




    );
}