import axios from 'axios';

const getAllCourses = () => {
    axios.get(`http://localhost:51853/api/courses`)
        .then(res => {
            return res.data;
        })
}



const updateCourse = (crs) => {
    var _crs = this.state.courses.filter(s => s.Crs_Id == crs.Crs_Id);
    //if student exits then update
    if (_crs.length > 0) {
        axios.put(`http://localhost:51853/api/courses/${crs.Crs_Id}`, crs)
            .then(res => {
                return res.data;
            })
    }
    // if not then add as new student
    else {
        axios.post(`http://localhost:51853/api/courses`, crs)
            .then(res => {
                return res.data;
            })
    }
}




const deleteCrs = (id) => {
    axios.delete(`http://localhost:51853/api/courses/${id}`).then(res => {
        return res.data;
    })
}

module.exports = {getAllCourses,updateCourse,deleteCrs};