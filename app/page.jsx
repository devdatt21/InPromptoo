import React from 'react'
import Feed from '@components/Feed'

const Home = () => {

    
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share 
        </h1>
        <br className="max-md:hidden" />
        <span className="orange_gradient head_text text-center">
            AI-Powered Prompts
        </span>
        <p className="desc text-center">
            In Promptoo is an open-source AI prompting tool for modern world to discover, create and share prompts
        </p>
        <Feed/>


    </section>
  )
}

export default Home