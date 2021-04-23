import React from "react";
import { withRouter } from "react-router-dom";
import './CourseUpdate.css';

class CourseUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleTopicChange = this.handleTopicChange.bind(this);
    }

    componentWillMount() {
        this.props.getAllTopics();
    }

    render() {
        return (
            <div className="updateFormWrapper">
                <h2 className="mt-3 text-info">Add or Update Course</h2>
                <form className="form" onSubmit={this.handleSubmit} onReset={this.handleReset.bind(this)}>
                    <div className="form-group">
                        <label >Id </label>
                        <input name="id" className="form-control mb-1" type="number" min="1" max="9999999999"
                            value={this.props.selectedCrs.Crs_Id} onChange={this.handleIdChange} required />
                    </div>
                    <div className="form-group">
                        <label >Name </label>
                        <input placeholder="Name" type="text" className="form-control mb-1"
                            value={this.props.selectedCrs.Crs_Name} onChange={this.handleNameChange} required />
                    </div>
                    <div className="form-group">
                        <label >Duration </label>
                        <input placeholder="Duration" type="number" className="form-control mb-1"
                            value={this.props.selectedCrs.Crs_Duration} onChange={this.handleDurationChange} required />
                    </div>
                    <div className="form-group">
                        <label >Topic </label>
                        <select name="grade" className="form-control mb-3"
                            onChange={this.handleTopicChange}  required>
                                <option selected disabled hidden>-- Select Topic --</option>
                            {
                            this.props.topics.map(el => (
                                <option selected={this.props.selectedCrs.Top_Id === el.Top_Id} value={el.Top_Id}>
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

    handleSubmit(event) {
        event.preventDefault();
        if(this.props.selectedCrs.Top_Id==0){
            alert("Please select a topic");
            return;
        }
        this.props.updateHandler(this.props.selectedCrs)
        this.props.history.push('/courses-list')
    }

    handleReset() {
        this.props.selectHandler({
            Crs_Id: 0,
            Crs_Name: '',
            Crs_Duration: 0,
            Top_Id:0,
        });
    }


    handleIdChange(e) {
        this.props.selectHandler({
            Crs_Id: e.target.value,
            Crs_Name: this.props.selectedCrs.Crs_Name,
            Crs_Duration: this.props.selectedCrs.Crs_Duration,
            Top_Id: this.props.selectedCrs.Top_Id
        });
    }

    handleNameChange(e) {
        this.props.selectHandler({
            Crs_Id: this.props.selectedCrs.Crs_Id,
            Crs_Name: e.target.value,
            Crs_Duration: this.props.selectedCrs.Crs_Duration,
            Top_Id: this.props.selectedCrs.Top_Id
        });
    }

    handleDurationChange(e) {
        this.props.selectHandler({
            Crs_Id: this.props.selectedCrs.Crs_Id,
            Crs_Name: this.props.selectedCrs.Crs_Name,
            Crs_Duration: e.target.value,
            Top_Id: this.props.selectedCrs.Top_Id
        });
    }

    handleTopicChange(e) {
        this.props.selectHandler({
            Crs_Id: this.props.selectedCrs.Crs_Id,
            Crs_Name: this.props.selectedCrs.Crs_Name,
            Crs_Duration: this.props.selectedCrs.Crs_Duration,
            Top_Id: e.target.value
        });
    }
}

export default withRouter(CourseUpdate)