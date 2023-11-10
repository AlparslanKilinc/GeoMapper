import React from 'react';
import '../../styles/commentSection.css'


export default function Comment(){
    return(
        <div className = 'comment-container'>
            <img  src = "https://st.depositphotos.com/1743476/1276/i/950/depositphotos_12765264-stock-photo-smiling-business-man.jpg"/>
            <div>
                <span className = "username">John Doe</span>
                <span className = "comment-text">This is my comment</span>
                <div>
                    <span className = "reply">reply</span>
                </div>
            </div>
        </div>
    );
}