import React from "react";
import { withRouter } from "react-router-dom";
import './CourseUpdate.css';
const { getAllCourses, updateCourse, deleteCrs } = require('../../Controller/CourseDB')
const { getAllTopics } = require('../../Controller/TopicDB')

class CourseUpdate extends React.Component {
    state = {
        course: {
            Crs_Id: 0,
            Crs_Name: '',
            Crs_Duration: '',
            Top_Id: 0
        },
        topics: []
    }
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log("location state: ", this.props.location.state);
        this.setState({ course: this.props.location.state })
        this.setState({ topics: getAllTopics() })
    }

    render() {
        return (
            <div className="updateFormWrapper">
                <h2 className="mt-3 text-info">Add or Update Course</h2>
                <form className="form" onSubmit={this.handleSubmit} onReset={this.handleReset.bind(this)}>
                    <div className="form-group">
                        <label >Id </label>
                        <input name="id" className="form-control mb-1" type="number" min="1" max="9999999999"
                            value={this.state.course.Crs_Id} onChange={this.handleIdChange} required />
                    </div>
                    <div className="form-group">
                        <label >Name </label>
                        <input placeholder="Name" type="text" className="form-control mb-1"
                            value={this.state.course.Crs_Name} onChange={this.handleNameChange} required />
                    </div>
                    <div className="form-group">
                        <label >Duration </label>
                        <input placeholder="Duration" type="number" className="form-control mb-1"
                            value={this.state.course.Crs_Duration} onChange={this.handleDurationChange} required />
                    </div>
                    <div className="form-group">
                        <label >Topic </label>
                        <select name="grade" className="form-control mb-3"
                            onChange={this.handleTopicChange} required>
                            <option selected disabled hidden>-- Select Topic --</option>
                            {
                                this.state.topics.map(el => (
                                    <option selected={this.state.course.Top_Id === el.Top_Id} value={el.Top_Id}>
                                        {el.Top_Name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="row">
                        <input value="Submit" className="btn btn-success col-7" type="submit" />
                        <input value="Reset" className="btn btn-info offset-1 col-4" type="reset" />
                    </div>
                </form>
            </div>
        )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.course.Top_Id == 0) {
            alert("Please select a topic");
            return;
        }
        const courses = updateCourse(this.state.course)
        this.props.history.push('/courses-list', courses)
    }

    handleReset = () => {
        this.setState({
            course: {
                Crs_Id: 0,
                Crs_Name: '',
                Crs_Duration: '',
                Top_Id: 0
            }
        })
    }


    handleIdChange = (e) => {
        this.setState(prevState => {
            let crs = Object.assign({}, prevState.course);
            crs.Crs_Id = parseInt(e.target.value);
            return { crs };
        })
    }

    handleNameChange = (e) => {
        this.setState(prevState => {
            let course = Object.assign({}, prevState.course);
            course.Crs_Name = e.target.value;
            return { course };
        })
    }

    handleDurationChange = (e) => {
        this.setState(prevState => {
            let course = Object.assign({}, prevState.course);
            course.Crs_Duration = parseInt(e.target.value);
            return { course };
        })
    }

    handleTopicChange = (e) => {
        this.setState(prevState => {
            let course = Object.assign({}, prevState.course);
            course.Top_Id = parseInt(e.target.value);
            return { course };
        })
    }
}

export default withRouter(CourseUpdate)