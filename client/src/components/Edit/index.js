import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    
    state = {
        email: this.props.currentUser.email,
        password: "",
        name: this.props.currentUser.name
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let { currentUser } = this.props
        axios.patch(`/api/users/${currentUser._id}`, this.state)
            .then( res => {
                this.props.history.push('/profile');    
            })
    };

    handleDelete = (e) => {
        e.preventDefault();
        let { currentUser } = this.props
        axios.delete(`/api/users/${currentUser._id}`)
            .then( res => {
                this.props.history.push('/logout');
            })
    };

    render() {
        let { email, password, name } = this.state;
        return (
            <div>
                <h1> Edit Profile </h1>
                <div className="row">
                    <div className="column column-50 column-offset-25">
                        <form onSubmit={this.handleSubmit}>
                            <label>Name: </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                onChange={this.handleChange}
                                value={name}
                                />
                            <label>Email: </label>
                            <input 
                                type="text"
                                name="email"
                                placeholder="Your Email"
                                onChange={this.handleChange}
                                value={email}
                                />
                            <label>Password: </label>
                            <input 
                                type="password"
                                name="password"
                                placeholder="Secret password here..."
                                onChange={this.handleChange}
                                value={password}
                                />
                            <input type="submit" />
                        </form>
                        <button onClick={this.handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}