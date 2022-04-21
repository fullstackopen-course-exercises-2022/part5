import React from 'react'
import Toggle from './Toggle'

const Blog = ({ blog, viewRef, updateBlog, deleteBlog }) => {
    const update = (evt) => {
        evt.preventDefault()
        const updateLike = ({
            ...blog,
            likes: blog?.likes + 1
        })
        updateBlog(updateLike)
    }
    return (
        <div>
            <div>
                {blog?.title}
            </div>
            <Toggle buttonLabel='View' ref={viewRef}>
                <div>{blog?.author}</div>
                <div>{blog?.url}</div>
                <div>{blog?.likes}</div>
                <button className="btn-like" onClick={update}>Like</button>
                <button className="btn-like" onClick={() => deleteBlog(blog?.id)}>Delete Blog</button>
            </Toggle>
        </div>
    )
}


export default Blog