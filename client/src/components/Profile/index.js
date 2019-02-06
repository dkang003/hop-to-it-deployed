import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'


class Profile extends Component {
    state = {
        favorites: [],
        venues:  [],
        loading: true
    }

    async componentDidMount() {
        let { currentUser } = this.props
        
        try {
            let { data: { response: { venues } }} = await axios.get('/test');
            let { data: { payload } } = await axios.get(`/api/users/${currentUser._id}`);
            this.setState({ 
                venues,
                user: payload, 
                favorites: payload.favorites, 
                loading: false 
            })
        } catch(err) {
            console.log(err);
        }


        // // Ping Foursquare API to retrieve venues info
        // axios.get('/test')
        //     .then(res => {
        //         this.setState({ allBreweries: res.data.response.venues })
        //     }).catch(err => {
        //         debugger
        //     })

        // // Ping our API to retrieve currentUser info
        // axios.get(`/api/users/${currentUser._id}`)
        //     .then(({ data }) => {
        //         this.setState({ user: data.payload, favorites: data.payload.favorites, loading: false })
        //     }).catch(err => {
        //         debugger
        //     })
    }

    render() {
        let { user, loading, favorites, venues } = this.state;

        // Loop through allBreweries to search and retrieve info using brewId in user's favorites
        var filteredBrewery = [];
        for (var i = 0; i < favorites.length; i++) {
            var id = favorites[i];
            // debugger
            // For each ID in favorites, find the object in allBreweries that has a matching ID
            venues.filter((element) => {
                if (element.id === id) {
                    // If the element ID from the venues array matches the Favorites ID, then save to
                    // our filteredBrewery array
                    filteredBrewery.push(element)
                    // debugger
                }
            })
        } 
         // Iterate through the filteredBrewery array and display info from each
    if (loading) return <div></div>
    return (
        <div className="faveBreweriesContainer">
            <h1> { user.name } Profile </h1>
            <h5> { user.email } </h5>
            <Link to="/edit">Edit Profile</Link>
            <div className="row">
                <ul>
                    {filteredBrewery.map(( eachBrewery, i ) => {
                        return<div key={i}>
                        <h5>{eachBrewery.name}</h5>
                        <p>{eachBrewery.location.address}</p>
                        <p>{eachBrewery.location.city},
                        {eachBrewery.location.state},
                        {eachBrewery.location.postalCode}</p>
                        </div>
                    })} 
                </ul>
            </div>
        </div>
        )
    }
    
}

export default Profile;