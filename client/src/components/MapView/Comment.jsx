import React from 'react';
import '../../styles/commentSection.css'
import Typography from "@mui/material/Typography";


export default function Comment(){
    return(
        <div className = 'comment-container'>
            <img  src = "https://st.depositphotos.com/1743476/1276/i/950/depositphotos_12765264-stock-photo-smiling-business-man.jpg"/>
            <div>
                <Typography className = "username" sx = {{mr: '10px',  fontWeight: 'bold'   }}>
                    John Doe<span style = {{fontWeight: 'normal', paddingLeft: '5px'}}> comment</span>
                </Typography>
                <div>
                    <Typography className = "reply">reply</Typography>
                </div>
            </div>
        </div>
    );
}