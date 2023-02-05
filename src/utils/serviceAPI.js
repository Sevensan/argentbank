import axios from 'axios'


export const postLogin = (user) => {
  return axios.post('http://localhost:3001/api/v1/user/login', (user))
}

export const signUp = (user) => {
  return axios.post('http://localhost:3001/api/v1/user/signup', (user))
}

export const postProfile = (token) => {
  return axios.post('http://localhost:3001/api/v1/user/profile', {}, {headers : token})
}

export const putProfile = (body,token) => {
  console.log("body : ", body)
  console.log("token : ", token)
  return axios.put('http://localhost:3001/api/v1/user/profile', {body}, {headers : token})
}