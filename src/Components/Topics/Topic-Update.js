import React from "react";
import { withRouter } from "react-router-dom";
import './TopicUpdate.css';

class TopicUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    render() {
        return (
            <div className="updateFormWrapper">
                <h2 className="mt-3 text-info">Add or Update Topic</h2>
                <form className="form" onSubmit={this.handleSubmit} onReset={this.handleReset.bind(this)}>
                    <div className="form-group">
                        <label >Id </label>
                        <input name="id" className="form-control mb-1" type="number" min="1" max="9999999999"
                            value={this.props.selectedTopic.Top_Id} onChange={this.handleIdChange} required />
                    </div>
                    <div className="form-group">
                        <label >Name </label>
                        <input placeholder="Name" type="text" className="form-control mb-1"
                            value={this.props.selectedTopic.Top_Name} onChange={this.handleNameChange} required />
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
        this.props.updateHandler(this.props.selectedTopic)
        this.props.history.push('/topic-list')
    }

    handleReset() {
        this.props.selectHandler({
            Top_Id: 0,
            Top_Name: '',
            Course:{}
        });
    }


    handleIdChange(e) {
        this.props.selectHandler({
            Top_Id: e.target.value,
            Top_Name: this.props.selectedTopic.Top_Name,
            Course:this.props.selectedTopic.Course
        });
    }

    handleNameChange(e) {
        this.props.selectHandler({
            Top_Id: this.props.selectedTopic.Top_Id,
            Top_Name: e.target.value,
            Course:this.props.selectedTopic.Course
        });
    }
}

export default withRouter(TopicUpdate)