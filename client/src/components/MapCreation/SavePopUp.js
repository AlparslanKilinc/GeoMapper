import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GeoMapperImage from "../../assets/GeoMapperLogo.svg";


export default function SavePopUp({ open, onClose, title}) {
    return(
        <div id = "like-popup">
            <Dialog open={open} onClose={onClose}>
                <IconButton onClick={onClose} sx = {{
                    ml:'350px',
                }}>
                    <CloseIcon />
                </IconButton>
                <div style={{ display: 'flex', alignItems: 'center',
                    marginLeft: '120px',
                    marginTop: '-15px'
                }}>
                    <img src={GeoMapperImage} alt="GeoMapper Logo" width="50" height="50" />
                    <span style={{ fontSize: '18px' }}>GeoMapper</span>
                </div>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Button sx = {{
                        backgroundColor: 'var(--main-color)',
                        '&:hover': {backgroundColor: 'var(--dark-color)'},
                        color:'white',
                        width:'200px',
                        mt: '10px',
                        p:'10px',
                        ml: "70px",
                        mb: "15px",
                        borderRadius: '20px'}}>
                        Sign in with Google
                    </Button>
                    <Divider>or</Divider>
                    <Button variant="outlined" href = "/regiter"sx = {{
                        backgroundColor: 'white',
                        '&:hover': {borderColor: 'var(--dark-color)'},
                        color:'black',
                        borderColor: 'dimgrey',
                        width:'200px',
                        p:'10px',
                        mt: '20px',
                        ml: "70px",
                        mb: "15px",
                        borderRadius: '20px'}}>
                        Create an account
                    </Button>
                </DialogContent>
                <DialogContentText sx = {{
                    typography: 'caption',
                    color: "dimgrey",
                    ml: "100px"
                }}>Already have an account?
                    <Link href = "/login"  sx = {{
                        typography: 'caption',
                        color: "dimgrey"
                    }}>Log In</Link>
                </DialogContentText>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </div>
    );
}