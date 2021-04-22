import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class TopicsList extends React.Component {
    constructor(props) {
        super(props)
        this.delete = this.delete.bind(this)
    }

    componentWillMount() {
        this.props.getAllTopics();
    }
    componentWillUpdate() {
        this.props.getAllTopics();
    }

    render() {

        if (this.props.data.length == 0)
            return (<div className="display-1 text-center text-primary">Loading ...</div>)

        return (
            <TableContainer component={Paper}>
                <Table style={{minWidth:"650"}} aria-label="simple table">
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
                        {this.props.data.map((row) => (
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


    delete(id) {
        var x = window.confirm("Are you sure?");
        if (x)
            this.props.deleteHandler(id);
    }

    select(st) {
        this.props.selectHandler(st);
        this.props.history.push('/topic-update');
    }


}
export default withRouter(TopicsList)