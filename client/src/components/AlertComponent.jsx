import React from 'react';
import Alert from "@mui/material/Alert";
import {Snackbar} from "@mui/material";

export default function AlertComponent({alertSeverity, alertMessage, autoHideDuration, handleCloseAlert}) {

    return (
        <Snackbar
            open={true}
            autoHideDuration={autoHideDuration}
            onClose={handleCloseAlert}
            style = {{marginTop: '50px'}}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Set anchor origin to top center
        >
            <Alert severity={alertSeverity} style={{ fontSize: 'small', padding: '8px' }}
            >
                {alertMessage}
            </Alert>
        </Snackbar>
    )

}
