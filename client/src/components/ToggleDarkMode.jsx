import  React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';



export default function ToggleDarkMode ({handleDarkModeClick, isDark}) {

    return(

        <div className = "toggle-container">
            <IconButton onClick={handleDarkModeClick} color="inherit">
                {isDark ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>



        </div>
    );

}