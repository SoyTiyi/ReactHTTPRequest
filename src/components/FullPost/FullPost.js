import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FullPost.css';

const FullPost = props => {
    const [postState, setPostState] = useState(null)
    const url = 'https://jsonplaceholder.typicode.com/posts/' + props.id;
    const getPostWithId = () => {
        if (props.id) {
            if (!postState || (postState && postState.id !== props.id)) {
                axios.get(url)
                    .then((response) => {
                        setPostState(response.data);
                    })
                    .catch(error => console.log(`Error: ${error}`, url));
            }
        }
    }
    useEffect(() => {
        getPostWithId();
    });
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (props.id) {
        post = <p style={{ textAlign: 'center' }}>Loading.....!</p>;
    }

    const deletePost = id => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/'+id)
            .then((response) => {
                console.log(response);
            })
            .catch(error => console.log(`Error:${error}`));
    }

    if (postState) {
        post = (
            <div className="FullPost">
                <h1>{postState.title}</h1>
                <p>{postState.body}</p>
                <div className="Edit">
                    <button className="Delete" onClick={() => deletePost(postState.id)}>Delete</button>
                </div>
            </div>
        );
    }
    return post;
}

export default FullPost;