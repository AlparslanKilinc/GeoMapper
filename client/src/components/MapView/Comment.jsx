import React from 'react';
import '../../styles/commentSection.css'


export default function Comment({key, comment}){
    return(
        <div className = 'comment-container'>
            <img  src = "https://st.depositphotos.com/1743476/1276/i/950/depositphotos_12765264-stock-photo-smiling-business-man.jpg"/>
            <div>
                <span className = "username">{comment.author}</span>
                <span className="comment-text" style={{ whiteSpace: 'pre-line' }}>
                {comment.text}
                </span>
            </div>
        </div>
    );
}