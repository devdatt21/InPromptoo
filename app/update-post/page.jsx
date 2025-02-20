"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPromptContent />
        </Suspense>
    );
};

const EditPromptContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    useEffect(() => {
        const fetchPromptDetails = async () => {
            if (!promptId) return;
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({ prompt: data.prompt, tag: data.tag });
        };

        fetchPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) {
            alert("Prompt ID not found");
            return;
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
            });

            if (response.ok) router.push("/profile");
        } catch (error) {
            console.error("Failed to update the prompt", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
    );
};

export default EditPrompt;
