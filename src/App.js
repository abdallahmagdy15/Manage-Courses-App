import './App.css';
import Header from './Components/Header';
import React from 'react';
import Login from './Components/Login';
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import CourseUpdate from './Components/Courses/Course-Update';
import CoursesList from './Components/Courses/Courses-List';
import TopicUpdate from './Components/Topics/Topic-Update';
import TopicsList from './Components/Topics/Topics-List';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route component={Login} path="/login" exact />

          <Route component={CourseUpdate} path="/course-update" exact />

          <Route component={CoursesList} path="/courses-list" exact />

          <Route component={TopicUpdate} path="/topic-update" exact />

          <Route component={TopicsList} path="/topics-list" exact />

          <Redirect exact from="/" to="login" />
        </Router>
      </div>
    );
  }

}