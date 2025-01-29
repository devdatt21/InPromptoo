'use client'

import React, { useState, useEffect } from 'react'
import PromptCard from './PromptCard'



const PromptCardList = ({postData, handleTagClick}) => {

    
    return (
        <div className="mt-16 prompt_layout">
            {postData.map((post) => (
                <PromptCard key={post._id} {...post} handleTagClick={handleTagClick} />
            ))}
        </div>
    )
}

const Feed = () => {

    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
        }
        console.log(posts);
        fetchPosts();
    }, []);



  return (
    <section className="feed">
        <form action="" className="relative w-full flex-center">
            <input 
                type="text" 
                placeholder="Search for a tag or a username" 
                required 
                className="search_input peer"
                value={searchText}
                onChange={handleSearchChange}
                />
        </form>

        <PromptCardList 
            postData={posts}
            handleTagClick={()=>{}}
        />
    </section>
  )
}

export default Feed