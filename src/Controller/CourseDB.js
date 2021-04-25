import axios from 'axios';

const getAllCourses = () => {
    return axios.get(`http://localhost:51853/api/courses`)
}

const getCourse = (id) => {
    return axios.get(`http://localhost:51853/api/courses/${id}`);
}


const updateCourse = (crs) => {
    return axios.put(`http://localhost:51853/api/courses/${crs.Crs_Id}`, crs)
}

const addCourse = (crs) => {
    return axios.post(`http://localhost:51853/api/courses`, crs)
}



const deleteCrs = (id) => {
    return axios.delete(`http://localhost:51853/api/courses/${id}`)
}

export { getAllCourses, updateCourse, deleteCrs, addCourse, getCourse };