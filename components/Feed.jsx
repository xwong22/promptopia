'use client'

import { useState, useEffect } from 'react'

import PromptCard from '@components/PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])

  // search states
  const [searchText, setSearchText] = useState('')

  // define the fetchPosts function
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleTagClick = () => {

  }


  const handleSearchChange = (e) => {

  }



  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
        <button
          type='submit'
          className='absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-primary-orange rounded-full text-white'
        >
          Search
        </button>
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed