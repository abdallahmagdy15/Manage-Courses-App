import './App.css';
import Header from './Components/Header';
import React from 'react';
import Login from './Components/Login';
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import axios from 'axios';
import CourseUpdate from './Components/Courses/Course-Update';
import CoursesList from './Components/Courses/Courses-List';
import TopicUpdate from './Components/Topics/Topic-Update';
import TopicsList from './Components/Topics/Topics-List';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.UpdateList = this.updateCourse.bind(this);
    this.Delete = this.deleteCrs.bind(this);
    this.setSelectedCrs = this.setSelectedCrs.bind(this);
  }

  state = {
    courses: [],
    topics: [],
    selectedCrs: { Crs_Id: 0, Crs_Name: '', Crs_Duration: 0, Top_Id: 0, Topic: {} },
    selectedTopic: { Top_Id: 0, Top_Name: '', Course: [] }
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route render={() => (
            <Login />
          )} path="/login" exact />

          <Route render={() => (
            <CourseUpdate getAllTopics={this.getAllTopics} topics={this.state.topics} updateHandler={this.updateCourse}
              selectedCrs={this.state.selectedCrs} selectHandler={this.setSelectedCrs} />)
          } path="/course-update" exact />

          <Route render={() => (
            <CoursesList getAllCourses={this.getAllCourses} data={this.state.courses} deleteHandler={this.deleteCrs}
              selectHandler={this.setSelectedCrs} />
          )} path="/courses-list" exact />

          <Route render={() => (
            <TopicUpdate updateHandler={this.updateTopic}
              selectedTopic={this.state.selectedTopic} selectHandler={this.setSelectedTopic} />)
          } path="/topic-update" exact />

          <Route render={() => (
            <TopicsList getAllTopics={this.getAllTopics} data={this.state.topics} deleteHandler={this.deleteTopic}
              selectHandler={this.setSelectedTopic} />
          )} path="/topics-list" exact />

          <Redirect exact from="/" to="login" />
        </Router>
      </div>
    );
  }


  getAllCourses = () => {
    axios.get(`http://localhost:51853/api/courses`)
      .then(res => {
        this.setState({ courses: res.data });
      })
  }

  getAllTopics = () => {
    axios.get(`http://localhost:51853/api/topics`)
      .then(res => {
        this.setState({ topics: res.data });
      })
  }

  updateCourse = (crs) => {
    var _crs = this.state.courses.filter(s => s.Crs_Id == crs.Crs_Id);
    //if student exits then update
    if (_crs.length > 0) {
      axios.put(`http://localhost:51853/api/courses/${crs.Crs_Id}`, crs)
        .then(res => {
          this.setState({ courses: res.data });
        })
    }
    // if not then add as new student
    else {
      axios.post(`http://localhost:51853/api/courses`, crs)
        .then(res => {
          this.setState({ courses: res.data });
        })
    }
  }


  updateTopic = (topic) => {
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

  deleteCrs = (id) => {
    axios.delete(`http://localhost:51853/api/courses/${id}`).then(res => {
      this.setState({ courses: res.data });
    })
  }

  deleteTopic = (id) => {
    axios.delete(`http://localhost:51853/api/topics/${id}`).then(res => {
      this.setState({ topics: res.data });
    })
  }

  setSelectedCrs(crs) {
    this.setState({
      selectedCrs: crs
    })
  }

  setSelectedTopic = (topic) => {
    this.setState({
      selectedTopic: topic
    });
  }

}