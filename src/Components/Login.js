import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props)
        var uname = localStorage.getItem("username");
        if (uname != null) {
            this.props.history.push('/courses-list');
        }
    }
    state = {
        username: '',
        password: ''
    }
    render() {
        return (
            <div className="LoginWrapper">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={this.submitForm.bind(this)} >
                            <h3>Sign In</h3>

                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-control" onChange={this.unameHandler.bind(this)} placeholder="Enter Username" required />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" onChange={this.passHandler.bind(this)} required />
                            </div>

                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>

                            <input type="submit" className="btn btn-primary btn-block" value="Login" />
                            <p className="forgot-password text-right">
                                Forgot <a href="#">password?</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    unameHandler(e) {
        this.state.username = e.target.value;
    }
    passHandler(e) {
        this.state.password = e.target.value;
    }
    submitForm(event) {
        event.preventDefault();

        axios.post('http://localhost:51853/api/Auth',
            { username: this.state.username, password: this.state.password }).then(res => {
                localStorage.setItem("username", this.state.username);
                localStorage.setItem("token", res.data.Authorization);
                this.props.history.push('/courses-list')
            }).catch(err => {
                console.log(err.response);
                if (err.response.status == 401) {
                    alert('Wrong username or password!');
                }
                else
                    alert('An error has occurred!');
            })
    }
}
export default withRouter(Login);
