import React from 'react';
import '../../styles/commentSection.css'


export default function Comment({key, comment}){
    return(
        <div className = 'comment-container'>
            <img  src = {comment.authorProfilePicture}/>
            <div>
                <span className = "username">{comment.author}</span>
                <span className="comment-text" style={{ whiteSpace: 'pre-line' }}>
                {comment.text}
                </span>
            </div>
        </div>
    );
}