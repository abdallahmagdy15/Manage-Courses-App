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

class CoursesList extends React.Component {
    constructor(props) {
        super(props)
        this.delete = this.delete.bind(this)
    }
    render() {
        const useStyles = makeStyles({
            table: {
                minWidth: 650,
            },
        });

        const classes = useStyles();

        if (this.props.courses.length == 0)
            return (<div className="display-1 text-center text-primary">Loading ...</div>)
    
            return (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Duration</TableCell>
                                <TableCell align="right">Topic</TableCell>
                                <TableCell align="right">
                                    <a className="btn btn-info mr-1" onClick={this.select.bind(this, st)}>Edit</a>
                                    <a className="btn btn-danger" onClick={this.delete.bind(this, st.id)}>Delete</a>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.data.map((row) => (
                                <TableRow key={row.Crs_Id}>
                                    <TableCell component="th" scope="row">
                                        {row.Crs_Id}
                                    </TableCell>
                                    <TableCell align="right">{row.Crs_Name}</TableCell>
                                    <TableCell align="right">{row.Crs_Duration}</TableCell>
                                    <TableCell align="right">{row.Topic.Top_Name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
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
export default withRouter(CoursesList)

