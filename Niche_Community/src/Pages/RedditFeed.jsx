import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post.jsx';

const RedditFeed = () => {

    const [subreddit, setSubReddit]=useState("react");
    const [Error,setError]=useState("");
    const [loading, setLoading]=useState(false);
    const [posts,setPosts]=useState([]);

    console.log(posts)

    const fetchPosts=async(subredditName)=>{
        if(!subredditName){
            setError("Subreddit name cannot be empty");
            return;
        }

        setLoading(true);
        setError("");
        setPosts([]);
        try{
            const response=await axios.get(
                `https://www.reddit.com/r/${subreddit}/top.json?limit=10`
            );
            const fetchedPosts=response.data.data.children.map((post)=>post.data);
            setPosts(fetchedPosts)
        } catch(error){
            setError("Failed to fetch posts. Please check the subreddit name!");
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
       fetchPosts(subreddit) 
    }, [subreddit])

  return (
    <>
      <div className="reddit-feed-container">
        <h1>Reddit Feed Reader</h1>
        <div className="search-bar">
            <input type="text" 
                value={subreddit}
                onChange={(e)=>setSubReddit(e.target.value)}
                placeholder='Enter Subreddit name'
                autoComplete='off'
            />
            <button onClick={()=>fetchPosts(subreddit)}>Fetch Posts</button>
            
        </div>
        {loading && <p className='loading'>Loading Posts...</p>}
        {Error && <p className='error'>{Error}</p>}
        <div className="posts">
            {
                posts.length>0?(
                    posts.map((post)=><Post key={post.id} post={post}/> )
                ):(
                    !loading && <p>No posts to display. Try another subreddit.</p>
                )
            }    
        </div>    
      </div>

    </>
  )
}

export default RedditFeed;