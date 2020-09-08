import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');

    setPosts(res.data);
  };

  // NOTE: Empty array of second param tells react to only run this function once
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map(post => {
    return <div className="card" style={{ width: '30%', marginBottom: '30px' }} key={post.id}>
      <div className="card-body">
        <h3>
          {post.title}
        </h3>
        <CommentList postId={post.id} />
        <CommentCreate postId={post.id}/>
      </div>
    </div>;
  });

  return <div className="d-flex fled-row flex-wrap justify-content-between">
    {renderedPosts}
  </div>
}