import React, { useState } from 'react';
import axios from 'axios';
import './NewPost.css';

const NewPost = props => {
    const [newPostState, setNewPostState] = useState({
        title: '',
        content: '',
        author: 'Max'
    });

    const newPost = () => {
        const post = {
            title: newPostState.title,
            content: newPostState.content,
            author: newPostState.author
        }
        axios.post('https://jsonplaceholder.typicode.com/posts/',post)
            .then((responde) => {
                console.log(responde);
            })
            .catch(error => `Error: ${error}`);

    }

    return (
        <div className="NewPost">
            <h1>Add a Post</h1>
            <label>Title</label>
            <input type="text" value={newPostState.title} onChange={(event) => setNewPostState({ title: event.target.value })} />
            <label>Content</label>
            <textarea rows="4" value={newPostState.content} onChange={(event) => setNewPostState({ content: event.target.value })} />
            <label>Author</label>
            <select value={newPostState.author} onChange={(event) => setNewPostState({ author: event.target.value })}>
                <option value="Max">Max</option>
                <option value="Manu">Manu</option>
            </select>
            <button onClick={newPost}>Add Post</button>
        </div>
    );
}

export default NewPost;