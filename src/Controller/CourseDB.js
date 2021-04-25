import axios from 'axios';

const getAllCourses = () => {
    return axios.get(`http://localhost:51853/api/courses`)
}



const updateCourse = (crs) => {
    var _crs = this.state.courses.filter(s => s.Crs_Id == crs.Crs_Id);
    //if student exits then update
    if (_crs.length > 0) {
        return axios.put(`http://localhost:51853/api/courses/${crs.Crs_Id}`, crs)
    }
    // if not then add as new student
    else {
        return axios.post(`http://localhost:51853/api/courses`, crs)
    }
}




const deleteCrs = (id) => {
    return axios.delete(`http://localhost:51853/api/courses/${id}`)
}

export {getAllCourses,updateCourse,deleteCrs};