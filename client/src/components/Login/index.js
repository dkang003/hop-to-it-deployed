import React, { Component } from 'react';
import httpClient from '../../utilities/httpClient';

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    handleChange = (e) => {

        let { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        let user = await httpClient.authenticate(this.state, "/api/users/authenticate");
        if (user) {
            this.props.onLoginSuccess();
            this.props.history.push('/brewIndex');
        }
    }

    render () {
        let { email, password } = this.state;
        return (
            <div>
                <h1> Login </h1>
                <div className="row">
                    <div className="column column-50 column-offset-25">
                        <form onSubmit={this.handleSubmit}>
                            <label> Email: </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="john@gmail.com"
                                onChange={this.handleChange}
                                value={email}
                                />
                            <label> Password: </label> 
                            <input
                                type="password"
                                name="password"
                                placeholder="secret password"
                                onChange={this.handleChange}
                                value={password}
                                />
                            <input type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;