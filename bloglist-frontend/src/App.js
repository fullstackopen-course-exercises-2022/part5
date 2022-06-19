import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { User } from './services/user'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import AlertToast from './components/AlertToast'
import './app.css'
import Toggle from './components/Toggle'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const userInfo = window.localStorage.getItem('userInfo')
    if(userInfo) {
      const loggedInUser = JSON.parse(userInfo)
      setUser(loggedInUser)
    }
  }, [])

  async function handleLogin(evt) {
    evt.preventDefault()
    try {
      const response = await User.login({ username, password })
      window.localStorage.setItem('userInfo', JSON.stringify(response?.data))
    } catch(err) {
      console.log(err?.response?.data?.msg)
      setMessage(`[ERROR]: ${err?.response?.data?.msg}`)
    }
  }

  async function createBlog(formData) {
    try {
      const payload = await blogService.create(formData)
      setBlogs(blogs.concat(payload))
      setMessage(`Added ${formData?.title} to arsenal!`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(err) {
      console.log(err?.response?.data?.msg)
      setMessage(`[ERROR]: ${err?.response?.data?.msg}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (formData) => {
    try {
      const payload = await blogService.updateById(formData)
      setBlogs(blogs?.map(blog => blog?.id !== formData?.id ? blog : payload))
    } catch(err) {
      setMessage(`[ERROR]: ${err?.response?.data?.msg}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      if(window.confirm(`Are you sure you want to remove Blog ${id} from your arsenal!`)) {
        await blogService.deleteById(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setMessage(`Successfully DELETED Blog ${id}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else {
        return false
      }
    } catch(err) {
      setMessage(`[ERROR]: ${err}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  function handleLogout() {
    User.logout()
  }

  useEffect(() => {
    const getBlogs = () => {
      blogService.getAll().then(blogs =>
          setBlogs(blogs)
      )
    }

    return getBlogs()
  }, [])
  const viewRef = useRef()

    return(
      <div>
        <h2>Blogs</h2>
        {message && <AlertToast message={message} />}
        {user === null ?
          <Login
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          /> :
            <span>
              {user?.userInfo?.name} logged in <button onClick={handleLogout}>Logout</button><br /><br />
              {/*{message && <AlertToast message={message} />}*/}
              <Toggle buttonLabel='Reveal Form'>
                <BlogForm
                    createBlog={createBlog}
                />
              </Toggle>
              <br />
              {blogs.sort((l1, l2) => l1?.likes - l2?.likes).map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    viewRef={viewRef}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                />
              )}
            </span>
        }
      </div>
    )
}

export default App