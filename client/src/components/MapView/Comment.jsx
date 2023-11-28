import React from 'react';
import '../../styles/commentSection.css'
import {useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";


export default function Comment(){
    const comments = useSelector((state) => state.comments.comments);
    console.log(comments)
    if (!comments) {
        return null;
    }
    return(
        <div className="comment-container">
            {comments.map((comment, index) => (
                <div key={comment.id} className="comment-item">
                    <Avatar className = "img"  src={comments.profilePic} />
                    <div>
                        <div>
                            <span className="username">{comment.author}</span>
                            <span className="comment-text">{comment.text}</span>
                        </div>
                        <span className="reply">reply</span>
                    </div>
                </div>
            ))}
        </div>
    );
}