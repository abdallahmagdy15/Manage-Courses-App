import React from "react";
import { withRouter } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAllTopics, deleteTopic } from '../../Controller/TopicDB'
import { CircularProgress } from "@material-ui/core";

class TopicsList extends React.Component {
    state = {
        topics: []
    }
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const _topics = this.props.location.state;
        if (_topics != undefined)
            this.setState({ topics: _topics })
        else {
            getAllTopics().then(res => {
                this.setState({ topics: res.data })
            })
        }
    }

    componentDidUpdate() {
        getAllTopics().then(res => {
            this.setState({ topics: res.data })
        })
    }
    render() {

        if (this.state.topics.length == 0)
            return (
                <div className="display-4 text-center text-primary mt-5">
                    <CircularProgress color="secondary" className="mr-3" />
            Loading ...</div>
            )

        return (
            <TableContainer component={Paper}>
                <Table style={{ minWidth: "650" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Courses</TableCell>
                            <TableCell align="right">
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.topics.map((row) => (
                            <TableRow key={row.Crs_Id}>
                                <TableCell component="th" scope="row">
                                    {row.Top_Id}
                                </TableCell>
                                <TableCell align="right">{row.Top_Name}</TableCell>
                                <TableCell align="right">
                                    <select className="form-control">
                                        {row.Course.map(el => (
                                            <option>{el.Crs_Name}</option>
                                        ))}
                                    </select>
                                </TableCell>
                                <TableCell align="right">
                                    <a className="btn btn-info mr-1" onClick={this.select.bind(this, row)}>Edit</a>
                                    <a className="btn btn-danger" onClick={this.delete.bind(this, row.Top_Id)}>Delete</a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }


    delete = (id) => {
        var x = window.confirm("Are you sure?");
        if (x) {
            deleteTopic(id).then(res => {
                this.setState({ topics: res.data });
            })
        }
    }

    select = (st) => {
        this.props.history.push('/topic-update', st);
    }


}
export default withRouter(TopicsList)