import axios from 'axios'

const { REACT_APP_BLOG_URL } = process.env

const getAll = () => {
  const request = axios.get(`${REACT_APP_BLOG_URL}/api/blogs`)
  return request.then(response => response.data)
}

const authHeader = (storageToken) => {
  return {
    headers: {
      Authorization: `Bearer ${storageToken}`
    }
  }
}

export default { getAll, authHeader }