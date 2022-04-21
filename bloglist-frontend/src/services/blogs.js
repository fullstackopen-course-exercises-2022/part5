import axios from 'axios'

const { REACT_APP_BLOG_URL } = process.env
const user = JSON.parse(window.localStorage.getItem('userInfo'))

// let token = null
//
// const authHeader = (storageToken) => {
//   token = `Bearer ${storageToken}`
// }

const config = {
  headers:
      {
        Authorization: `Bearer ${user?.token}`
      }
}

const create = async (credentials) => {
  const response = await axios.post(`${REACT_APP_BLOG_URL}/api/blogs`, credentials, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  })

  return response.data
}

const getAll = () => {
  const request = axios.get(`${REACT_APP_BLOG_URL}/api/blogs`)
  return request.then(response => response.data)
}

const updateById = async (formData) => {
  const request = await axios.put(`${REACT_APP_BLOG_URL}/api/blogs/${formData?.id}`, formData, config)
  return request.data
}

const deleteById = async (id) => {
  const request = await axios.delete(`${REACT_APP_BLOG_URL}/api/blogs/${id}`, config)
  return request.data
}

export default { create, getAll, updateById, deleteById }