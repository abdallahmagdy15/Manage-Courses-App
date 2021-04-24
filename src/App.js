import './App.css';
import Header from './Components/Header';
import React from 'react';
import Login from './Components/Login';
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import CourseUpdate from './Components/Courses/Course-Update';
import CoursesList from './Components/Courses/Courses-List';
import TopicUpdate from './Components/Topics/Topic-Update';
import TopicsList from './Components/Topics/Topics-List';
const { getAllCourses, updateCourse, deleteCrs } = require('./Controller/CourseDB')
const { getAllTopics, updateTopic, deleteTopic } = require('./Controller/TopicDB')

export default class App extends React.Component {

  state = {
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
            <CourseUpdate getAllTopics={getAllTopics} updateHandler={updateCourse}
              selectedCrs={this.state.selectedCrs} selectHandler={this.setSelectedCrs} />)
          } path="/course-update" exact />

          <Route render={() => (
            <CoursesList getAllCourses={getAllCourses} deleteHandler={deleteCrs}
              selectHandler={this.setSelectedCrs} />
          )} path="/courses-list" exact />

          <Route render={() => (
            <TopicUpdate updateHandler={updateTopic}
              selectedTopic={this.state.selectedTopic} selectHandler={this.setSelectedTopic} />)
          } path="/topic-update" exact />

          <Route render={() => (
            <TopicsList getAllTopics={getAllTopics} deleteHandler={deleteTopic}
              selectHandler={this.setSelectedTopic} />
          )} path="/topics-list" exact />

          <Redirect exact from="/" to="login" />
        </Router>
      </div>
    );
  }

  setSelectedCrs = (crs) => {
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