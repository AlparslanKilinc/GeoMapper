import React from 'react';
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close.js";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
export default function SharePopUp({ open, onClose}) {

const handleClick = () => {
    navigator.clipboard.writeText(window.location.toString())
}
    return (
        <div id = "share-popup">
            <Dialog open={open} onClose={onClose}>
                <IconButton onClick={onClose} sx = {{
                    ml:'350px',
                }}>
                    <CloseIcon />
                </IconButton>
                <DialogTitle sx = {{
                    mt: "-40px",
                    ml: "120px"

                }}>Share</DialogTitle>

                <DialogContent>
                    <Button  onClick = {handleClick} sx = {{
                        backgroundColor: 'var(--main-color)',
                        '&:hover': {backgroundColor: 'var(--dark-color)'},
                        color:'white',
                        width:'200px',
                        mt: '10px',
                        p:'10px',
                        ml: "70px",
                        mb: "15px",
                        borderRadius: '20px'}}>
                        Copy link to clipboard
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );

}
