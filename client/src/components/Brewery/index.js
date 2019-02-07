import React, { Component } from 'react';
import axios from 'axios';
import './Brewery.css';
import { Link } from 'react-router-dom';


export default class Brewery extends Component {
    state = {
        currentUser:null,
        brewery:null,
        breweries: [],
        favorites: [],
        like: false
    }

    async componentDidMount() {
        let { currentUser, brewery, breweries } = this.props;
        try {
            let { data: { payload } } = await axios.get(`/api/users/${currentUser._id}`);
            this.setState({ favorites: payload.favorites })
            // Check for a brewery to see if it exists as favorite
            if (this.state.favorites.indexOf(brewery.id) > 0) {
                this.setState({ like: true })
            } 
        } catch(err) {
            debugger
        }
        
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let { currentUser, brewery } = this.props;

        this.setState({ like: !this.state.like })


        // show the individual brewery
        let res = await axios.get(`/api/breweries/${brewery.id}`)
        // check the returned brewery array from our api
        if (res.data.brewery.length === 0) {
            // make a new brewery
            let newBrewery = await axios.post(`/api/breweries`, {brewId: `${brewery.id}`})
        } else {
            let likeBrewery = await axios.patch(`/api/breweries/${brewery.id}`)
        }
    };

    render() {
        let {brewery} = this.props;
        return (
            <div>
                <h3>{brewery.name}</h3>
                <Link 
                    className="nav-link"
                    brewery={ brewery } 
                    to={`/brewShow/${brewery.id}`}>
                    {brewery.name}
                </Link>
                <form onSubmit={this.handleSubmit} className="button-small-black">
                {/* If like is false, render this input */}
                {  this.state.like === false
                ?  (<input
                        type="submit"
                        name="id"
                        value="Like"
                        />)
                 : 
                // If like is true, render this input 
                    (<input
                        type="submit"
                        name="id"
                        value="Unlike"
                        />)
                }

                </form>
            </div>
        )
    }
}
