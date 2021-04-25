import axios from 'axios';

const getAllTopics = () => {
    return axios.get(`http://localhost:51853/api/topics`)
}
const updateTopic = (topic) => {
    var _topic = this.state.topics.filter(s => s.Top_Id == topic.Top_Id);
    //if student exits then update
    if (_topic.length > 0) {
        return axios.put(`http://localhost:51853/api/topics/${topic.Top_Id}`, topic);
    }
    // if not then add as new student
    else {
        return axios.post(`http://localhost:51853/api/topics`, topic)
    }
}
const deleteTopic = (id) => {
    return axios.delete(`http://localhost:51853/api/topics/${id}`)
}
export { getAllTopics, updateTopic, deleteTopic }