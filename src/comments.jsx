import { useEffect, useState } from "react";
import { GetComments, GetUserID, PostComment } from "./fetch_data";
import "../styles/comments.css";
import { Button, TextField } from "@mui/material";

export function Comments(props) {

    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");
    const userID = GetUserID();

    const loadComments = async () => {
        const loadedComments = await GetComments(props.bookID);
        setComments(loadedComments);
    }

    const postComment = async (text) => {
        const posted = await PostComment(userID, props.bookID, text);
    }

    useEffect(() => {
        loadComments();
    }, []);

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
                <TextField placeholder="Write a comment..." onChange={(e) => setUserComment(e.target.value)} />
                <Button variant="outlined" onClick={() => postComment(userComment)}>Post</Button>
            </div>
        </div>
    );
}