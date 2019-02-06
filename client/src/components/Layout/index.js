import React, { Component } from 'react';
import Navbar from './Navbar';
import './Layout.css';

export default class Layout extends Component {
    
    render () {
        
        return (
            <div>
                <Navbar currentUser={this.props.currentUser} />
                <main className="container">
                    { this.props.children }
                </main>
            </div>
        )
    }
}
