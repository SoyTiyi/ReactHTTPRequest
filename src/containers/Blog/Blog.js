import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

const Blog = props => {

    const [postState, setPostState] = useState('');

    const [selectPostState, setSelectPostState] = useState(null);

    const url = 'https://jsonplaceholder.typicode.com/';

    const getAllPost = () => {
        axios.get(`${url}posts`)
            .then((response) => {
                const allPost = response.data.slice(0, 4);
                const postWithAuthor = allPost.map(post => {
                    return {
                        ...post,
                        author: 'Santiago'
                    }
                });
                /* console.log(allPost); */
                setPostState(postWithAuthor);
            })
            .catch(error => console.log(`Error: ${error}`, url));
    }

    useEffect(() => {
        getAllPost();
    }, []);

    const selectPost = (id) => {
        setSelectPostState(id);
    }

    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;


    if (postState.length > 0) {
        
        posts = (
            postState.map(post => {
                return <Post key={post.id} title={post.title} author={post.author} selectPost={() => selectPost(post.id)} />
            })
        );
    }

    return (
        <div>
            <section className="Posts">
                {posts}
            </section>
            <section>
                <FullPost id={selectPostState}/>
            </section>
            <section>
                <NewPost />
            </section>
        </div>
    );
}

export default Blog;