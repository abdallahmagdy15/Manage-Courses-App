import axios from 'axios';

const getAllTopics = () => {
    axios.get(`http://localhost:51853/api/topics`)
        .then(res => {
            this.setState({ topics: res.data });
        })
}
const updateTopic = (topic) => {
    var _topic = this.state.topics.filter(s => s.Top_Id == topic.Top_Id);
    //if student exits then update
    if (_topic.length > 0) {
        axios.put(`http://localhost:51853/api/topics/${topic.Top_Id}`, topic)
            .then(res => {
                this.setState({ topics: res.data });
            })
    }
    // if not then add as new student
    else {
        axios.post(`http://localhost:51853/api/topics`, topic)
            .then(res => {
                this.setState({ topics: res.data });
            })
    }
}
const deleteTopic = (id) => {
    axios.delete(`http://localhost:51853/api/topics/${id}`).then(res => {
        this.setState({ topics: res.data });
    })
}

module.exports = { getAllTopics, updateTopic, deleteTopic }