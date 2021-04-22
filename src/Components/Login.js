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
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked/>
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
        if (this.state.username=="Abdallah" && this.state.password == "123456") {
            localStorage.setItem("username", this.state.username);
            this.props.history.push('/courses-list')
        } else
            alert('Wrong username or password!');
    }
}
export default withRouter(Login);
