import React from "react";
import { withRouter } from "react-router-dom";
import './CourseUpdate.css';
import { addCourse, getCourse, updateCourse } from '../../Controller/CourseDB'
import { getAllTopics } from '../../Controller/TopicDB'

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

    componentDidMount() {
        console.log("location state: ", this.props.location.state);
        const _course = this.props.location.state;
        if (_course != undefined)
            this.setState({ course: _course })
        getAllTopics().then(res => {
            this.setState({ topics: res.data })
        })

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

        getCourse(this.state.course.Crs_Id).then(res => {
            //if student exits then update
            updateCourse(this.state.course).then(res => {
                this.props.history.push('/courses-list', res.data)
            })
        }).catch(res => {
            console.log(res);
            // if not then add as new student
            addCourse(this.state.course).then(res => {
                this.props.history.push('/courses-list', res.data)
            })
        })
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
            let course = Object.assign({}, prevState.course);
            course.Crs_Id = parseInt(e.target.value);
            return { course };
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