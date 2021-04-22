import React from "react";
import { withRouter } from "react-router-dom";
import './CourseUpdate.css';

class CourseUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: ['A', 'B', 'C', 'D', 'F']
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGradeChange = this.handleGradeChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    render() {
        return (
            <div className="updateFormWrapper">
                <h2 className="mt-3 text-info">Add or Update Student</h2>
                <form className="form" onSubmit={this.handleSubmit} onReset={this.handleReset.bind(this)}>
                    <div className="form-group">
                        <label >Id </label>
                        <input name="id" className="form-control mb-1" type="number" min="1" max="9999999999"
                            value={this.props.selectedStd.id} onChange={this.handleIdChange} required />
                    </div>
                    <div className="form-group">
                        <label >Name </label>

                        <input placeholder="Name" name="name" type="text" className="form-control mb-1"
                            value={this.props.selectedStd.name} onChange={this.handleNameChange} required />
                    </div>
                    <div className="form-group">
                        <label >Grade </label>
                        <select name="grade" className="form-control mb-3"
                            onChange={this.handleGradeChange}>
                            {this.state.grades.map(el => (
                                <option selected={this.props.selectedStd.grade === el} value={el}>
                                    {el}
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
        this.props.updateHandler(this.props.selectedStd)
        this.props.history.push('/student-list')
    }

    handleReset() {
        this.props.selectHandler({
            id: 0,
            name: '',
            grade: ''
        });
    }


    handleIdChange(e) {
        this.props.selectHandler({
            id: e.target.value,
            name: this.props.selectedStd.name,
            grade: this.props.selectedStd.grade
        });
    }

    handleNameChange(e) {
        this.props.selectHandler({
            id: this.props.selectedStd.id,
            name: e.target.value,
            grade: this.props.selectedStd.grade
        });
    }

    handleGradeChange(e) {
        this.props.selectHandler({
            id: this.props.selectedStd.id,
            name: this.props.selectedStd.name,
            grade: e.target.value
        });
    }
}

export default withRouter(CourseUpdate)