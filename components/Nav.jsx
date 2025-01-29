"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react"

const Nav = () => {

    const {data: session} = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        fetchProviders();
    },[])


  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src="/assets/images/logo.svg"
            alt="logo"
            width={30}
            height={30}
            />
            <p className="logo_text first-letter:text-red-600 first-letter:font-bold first-letter:text-2xl">
                In Promptoo
            </p>
            
            
        </Link>

        {/* desktop navigation */}
                        {/* small ane aena karta vadhare size ni screen mate flex and sm (640px) karta ochhi screen mate hidden */}
        <div className="sm:flex hidden">
            {session?.user ? (
                    
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-post" className="black_btn">
                        Create Post
                    </Link>
                    <button className="outline_btn" type="button" onClick={signOut}>
                        Sign Out
                    </button>
                    <Link href="/profile">
                        <Image src={session?.user.image}
                        alt="user"
                        width={37}
                        height={37}
                        className="rounded-full"
                        />
                    </Link>
                </div>
            ) : ( 
                <>
                    {providers && Object.values(providers).map((providers) => (
                        <button type="button" key={providers.name} onClick={() => signIn(providers.id)} className="black_btn">
                            Sign In
                        </button>
                    ))}
                </>
            )}
        </div>
        
        {/* mobile navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image src={session?.user.image}
                        alt="profile picture    "
                        width={37}
                        height={37}
                        className="rounded-full"
                        onClick={() => setToggleDropdown((prev) => (!prev))}
                        />

                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>
                                <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button type="button" onClick={() => {
                                    setToggleDropdown(false);
                                    signOut();
                                }} className="mt-5 w-full black_btn">
                                    Sign Out
                                </button>
                            </div>
                        )}
                </div>
                ) : (
                    <>
                    {providers && Object.values(providers).map((providers) => (
                        <button type="button" key={providers.name} onClick={() => signIn(providers.id)} className="black_btn">
                            Sign In
                        </button>
                    ))}
                </>
                )
            }
        </div>
        
    </nav>
  )
}

export default Nav