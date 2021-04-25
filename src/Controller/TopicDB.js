import axios from 'axios';

const getAllTopics = () => {
    return axios.get(`http://localhost:51853/api/topics`)
}

const getTopic = (id) => {
    return axios.get(`http://localhost:51853/api/topics/${id}`);
}


const updateTopic = (topic) => {

    return axios.put(`http://localhost:51853/api/topics/${topic.Top_Id}`, topic)
}

const addTopic = (topic) => {
    return axios.post(`http://localhost:51853/api/topics`, topic)
}

const deleteTopic = (id) => {
    return axios.delete(`http://localhost:51853/api/topics/${id}`)
}
export { getAllTopics, updateTopic, deleteTopic, getTopic, addTopic }