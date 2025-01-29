"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    useEffect(() => {
        const fetchPromptDetails = async () => {

            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });



        }
        if(promptId) fetchPromptDetails();
    }, [promptId]);


    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert("Prompt ID not found");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });


            if(response.ok) {
                router.push("/profile");
            }


        } catch (error) {
            console.log(error);
            console.log("Failed to update the prompt");
        } finally {
            setSubmitting(false);
        }


    }

  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt 