import React, {useState} from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


const PromptCard = ({prompt, tag, creator, handleTagClick, handleEdit, handleDelete}) => {

    const pathname = usePathname();
    const router = useRouter();
    const {data: session} = useSession();

    
    const [copied, setCopied] = useState("");
    const handleCopy = () => {
        setCopied(prompt);
        navigator.clipboard.writeText(prompt);
        setTimeout(() => setCopied(false), 3000);
    }




  return (
    <div className='prompt_card mb-2'>
        <div className='flex justify-between items-start gap-5'>

            <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                <Image 
                    src={creator.image}   
                    alt='assets/images/logo.svg' 
                    width={40} 
                    height={40} 
                    className='rounded-full object-contain' /> 

                <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>{creator.username}</h3>
                    <p className='font-inter text-sm text-gray-500'>{creator.email}</p>
                </div>

            </div>

            <div className='copy_btn'>
                    <Image 
                        src={copied===prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        width={12}
                        height={12}
                        alt='assets/images/logo.svg'
                        className='rounded-full object-contain'
                        onClick={handleCopy}

                    />
                </div>
            
        </div>

        
        <div className='flex flex-col mt-5 '>
            <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt}</p>
            <p 
            className='font-inter text-sm text-gray-500 blue_gradient cursor-pointer' 
            onClick={() => handleTagClick && handleTagClick(tag)}
            >
                {tag}
            </p>    

            {session?.user.id === creator._id && pathname === '/profile' && (
                <div className='mt-3 flex-center gap-4 border-t border-gray-100 pt-3'>
                    <p className='font-inter text-sm text-gray-500 green_gradient cursor-pointer' onClick={handleEdit}>Edit</p>
                    <p className='font-inter text-sm text-gray-500 orange_gradient cursor-pointer' onClick={handleDelete}>Delete</p>
                </div>

            )}
        </div>


    </div>
  )
}

export default PromptCard