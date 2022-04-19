import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { User } from './services/user'
import Login from './components/Login'

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
      blogService.authHeader(user?.token)
    }
  }, [])

  async function handleLogin(evt) {
    evt.preventDefault()
    try {
      const response = await User.login({username, password})
      window.localStorage.setItem('userInfo', JSON.stringify(response?.data))
    } catch(err) {
      console.log(err?.response?.data?.msg)
    }
  }

  function handleLogout() {
    User.logout()
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
    return(
      <div>
        <h2>Blogs</h2>
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
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </span>
        }
      </div>
    )
}

export default App