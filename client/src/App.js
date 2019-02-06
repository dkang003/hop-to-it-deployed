import React, { Component } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Edit from './components/Edit';
import BrewIndex from './components/BrewIndex';
import BrewShow from './components/BrewShow';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import httpClient from './utilities/httpClient';

class App extends Component {
    state = {
        currentUser: httpClient.getCurrentUser()
    }

    onAuthSuccess = () => {
        this.setState({ currentUser: httpClient.getCurrentUser() })
    }

    logout = () => {
        httpClient.logout();
        this.setState({ currentUser: null });
    }

    render () {
        return (
            <Layout currentUser={this.state.currentUser}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" render={(props) => {
                        return <Login {...props} onLoginSuccess={this.onAuthSuccess} />
                    }} />
                    <Route exact path="/logout" render={() => {
                        return <Logout logout={this.logout} />
                    }} />
                    <Route exact path="/signup" render={(props) => {
                        return <Signup {...props} onSignupSuccess={this.onAuthSuccess} />
                    }} />
                    <Route exact path="/profile" render={(props) => {
                        return <Profile currentUser={this.state.currentUser} />
                    }} />
                    <Route exact path="/edit" render={(props) => {
                        return <Edit {...props} currentUser={this.state.currentUser} />
                    }} />
                    {/* VIP example from class */}
                    <Route exact path="/brewIndex" render={(props) => {
                        return this.state.currentUser ? <BrewIndex {...props} currentUser={this.state.currentUser}/> : <Redirect to="/login" />
                    }} />
                    <Route exact path="/brewShow/:id" render={() => {
                        return this.state.currentUser ? <BrewShow /> : <Redirect to="/login" />
                    }} />
                </Switch>
            </Layout>
        )
    }
}

export default App;