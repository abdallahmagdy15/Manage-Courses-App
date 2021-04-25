import axios from 'axios';
//import tokenProvider from 'axios-token-interceptor'
const tokenProvider = require('axios-token-interceptor');

const instance = axios.create({
    baseURL: 'http://localhost:51853'
  });
  instance.interceptors.request.use(tokenProvider({
    getToken: () => localStorage.getItem('token')
}));

const getAllCourses = () => {
    return instance.get(`/api/courses`)
}

const getCourse = (id) => {
    return instance.get(`/api/courses/${id}`);
}


const updateCourse = (crs) => {
    return instance.put(`/api/courses/${crs.Crs_Id}`, crs)
}

const addCourse = (crs) => {
    return instance.post(`/api/courses`, crs)
}

const deleteCrs = (id) => {
    return instance.delete(`/api/courses/${id}`)
}

export { getAllCourses, updateCourse, deleteCrs, addCourse, getCourse };