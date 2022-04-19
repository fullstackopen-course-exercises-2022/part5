import axios from 'axios'

const { REACT_APP_BLOG_URL } = process.env

const login = async (credentials) => {
     return await axios.post(`${REACT_APP_BLOG_URL}/api/users/auth`, credentials)
}

const logout = () => {
    localStorage.clear()
}

export const User = {
    login,
    logout,
}