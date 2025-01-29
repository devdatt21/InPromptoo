import React from 'react'
import PromptCard from './PromptCard';


const Profile = ({name, desc, postData, handleEdit, handleDelete}) => {
  return (
    <section className='w-full max-w-full flex-center flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{name}</span>
        </h1>
        <p className='desc text-left max-w-md'>{desc}</p>

        <div className='mt-10 prompt_grid'>
        {postData.length > 0 ? (
                postData.map((post) => (
                    <PromptCard
                        key={post._id || post.id}
                        {...post}
                        handleEdit={() => handleEdit?.(post)}
                        handleDelete={() => handleDelete?.(post)}
                    />
                ))
            ) : (
                <p>No posts found.</p>
            )}      
        </div>
    </section>
  )
}

export default Profile