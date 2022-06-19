import React, { useState } from 'react'

function BlogForm({ createBlog }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [like, setLike] = useState(0)
    const handleCreateBlog = (evt) => {
        evt.preventDefault()
        createBlog({title, author, url, like})
        setTitle('')
        setAuthor('')
        setUrl('')
        setLike('')
    }
    return (
        <div className="container">
            <h2>Create New Blog</h2>
            <form onSubmit={handleCreateBlog} className="form">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="form__input" value={title} onChange={({target}) => setTitle(target.value)} /><br />
                <label htmlFor="author">Author</label>
                <input type="text" name="author" className="form__input" value={author} onChange={({target}) => setAuthor(target.value)} /><br />
                <label htmlFor="url">Url Link</label>
                <input type="text" name="url" className="form__input" value={url} onChange={({target}) => setUrl(target.value)} /><br />
                <label htmlFor="like">Like</label>
                <input type="number" name="like" className="form__input" value={like} onChange={({target}) => setLike(target.value)} /><br />
                <input type="submit" value="Create Blog" />
            </form>
        </div>
    )
}

export default BlogForm