import React from "react";
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component {
    state = {

    }
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">🌙 Ramadan Kareem  |</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link to="/login" class="nav-link" onClick={this.navigate} hidden={localStorage.getItem("username") != null}> Login</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/student-list" class="nav-link" onClick={this.navigate} hidden={localStorage.getItem("username") == null}>List</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/student-update" class="nav-link" onClick={this.navigate} hidden={localStorage.getItem("username") == null}>Update</Link>
                        </li>
                    </ul>
                    <div class="my-2 my-lg-0" hidden={localStorage.getItem("username") == null}>
                        <span className="text-light mr-2">Welcome {localStorage.getItem("username")} |</span>
                        <a className="btn btn-danger" onClick={this.logout.bind(this)}>Logout</a>
                    </div>
                </div>
            </nav>
        );
    }

    navigate(e) {
        document.getElementsByClassName('active')[0].classList.remove("active");
        e.target.classList.add('active');
    }
    logout() {
        localStorage.clear();
        this.props.history.push('/login')
    }
}

export default withRouter(Header);
