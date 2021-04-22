import React from "react";
import { withRouter } from "react-router-dom";

class TopicsList extends React.Component {
    constructor(props) {
        super(props)
        this.delete = this.delete.bind(this)
    }
    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Grade</th>
                    <th> </th>
                </thead>
                <tbody>
                    {
                        this.props.data.map(st => {
                            return (<tr>
                                <td>{st.id}</td>
                                <td>{st.name}</td>
                                <td>{st.grade}</td>
                                <td>
                                    <a className="btn btn-info mr-1" onClick={this.select.bind(this, st)}>Edit</a>
                                    <a className="btn btn-danger" onClick={this.delete.bind(this, st.id)}>Delete</a>
                                </td>
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        )
    }

    delete(id) {
        var x = window.confirm("Are you sure?");
        if (x)
            this.props.deleteHandler(id);
    }

    select(st) {
        this.props.selectHandler(st);
        this.props.history.push('/student-update');
    }

}
export default withRouter(TopicsList)