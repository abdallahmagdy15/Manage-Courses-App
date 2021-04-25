import React from "react";
import { withRouter } from "react-router-dom";
import './TopicUpdate.css';
import { addTopic, getTopic, updateTopic } from '../../Controller/TopicDB'

class TopicUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: {
                Top_Id: 0,
                Top_Name: '',
                Course: []
            }
        }

    }

    componentDidMount() {
        const _topic = this.props.location.state;
        console.log("topic : ", _topic);
        if (_topic != undefined)
            this.setState({ topic: _topic })
    }

    render() {
        return (
            <div className="updateFormWrapper">
                <h2 className="mt-3 text-info">Add or Update Topic</h2>
                <form className="form" onSubmit={this.handleSubmit} onReset={this.handleReset}>
                    <div className="form-group">
                        <label >Id </label>
                        <input name="id" className="form-control mb-1" type="number" min="1" max="9999999999"
                            value={this.state.topic.Top_Id} onChange={this.handleIdChange} required />
                    </div>
                    <div className="form-group">
                        <label >Name </label>
                        <input placeholder="Name" type="text" className="form-control mb-1"
                            value={this.state.topic.Top_Name} onChange={this.handleNameChange} required />
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

        getTopic(this.state.topic.Top_Id).then(res => {
            //if student exits then update
            this.state.topic.Course=res.data.Course;
            updateTopic(this.state.topic).then(res => {
                this.props.history.push('/topics-list', res.data)
            })
        }).catch(res => {
            console.log(res);
            // if not then add as new student
            addTopic(this.state.topic).then(res => {
                this.props.history.push('/topics-list', res.data)
            })
        })
    }

    handleReset = () => {
        this.setState({
            topic: {
                Top_Id: 0,
                Top_Name: '',
                Course: []
            }
        });
    }


    handleIdChange = (e) => {
        this.setState(prevState => {
            let topic = Object.assign({}, prevState.topic);
            topic.Top_Id = parseInt(e.target.value);
            return { topic };
        })
    }

    handleNameChange = (e) => {
        this.setState(prevState => {
            let topic = Object.assign({}, prevState.topic);
            topic.Top_Name = e.target.value;
            return { topic };
        })
    }
}

export default withRouter(TopicUpdate)