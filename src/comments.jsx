import { useEffect, useState } from "react";
import { get, GetUserID, post } from "./fetch_data";
import "../styles/comments.css";
import { Button, TextField } from "@mui/material";

export function Comments(props) {

    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");
    const [renderComments, setLoadComment] = useState(0);
    const userID = GetUserID();

    const loadComments = async () => {
        const loadedComments = await get(`comments/${props.bookID}`);
        setComments(loadedComments);
    }

    const postComment = async (text) => {
        const body = { user_id: userID, book_id: props.bookID, text };
        const posted = await post(`comments`, body);
        setUserComment("");
        setLoadComment(renderComments + 1);
    }

    useEffect(() => {
        loadComments();
    }, [renderComments]);

    return (
        <div className="comment-section">
            <div>Comments ({comments.length})</div>
            <div className="comments">
                {comments.map((c) => {
                    return (
                        <div key={c.id} className="comment">
                            <div className="comment-header">{c.first_name + " " + c.last_name} commented:</div>
                            <div className="comment-text">{c.text}</div>
                        </div>
                    );
                })}
            </div>
            <div className="post-comment">
                <TextField placeholder="Write a comment..." onChange={(e) => setUserComment(e.target.value)} value={userComment} />
                <Button variant="outlined" onClick={() => postComment(userComment)}>Post</Button>
            </div>
        </div>
    );
}