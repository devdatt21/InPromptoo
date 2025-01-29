"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile'

const MyProfile = () => {
    
    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();


    useEffect(() => {

        if (!session?.user?.id) return; //if the session is not ready yet then return and we 
                                        //gave it in dependency array whenever the session is ready then fetch the posts

        const fetchPosts = async () => {
            

            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);


        }

        // if(session.user._id) 
            
        fetchPosts();

    }, [session?.user?.id]);


    const handleEdit = (post) => {
        router.push(`/update-post?id=${post._id}`);
    }


    const handleDelete = (post) => {
        const confirm = window.confirm("Are you sure you want to delete this prompt?");
        if(confirm) {
            const deletePrompt = async () => {
                const response = await fetch(`/api/prompt/${post._id}`, {
                    method: "DELETE",
                });
                const data = await response.json();
                console.log(data);
            }
            deletePrompt();

            const filteredPosts = posts.filter((p) => p._id !== post._id);
            setPosts(filteredPosts);

            
        }


        
    }




    return (
        <Profile 
        name="My Profile"
        desc="Welcome to your profile page"
        postData={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />

    )
}



export default MyProfile