import React, { Component } from 'react';
import axios from 'axios';
import Brewery from '../Brewery';
import Map from '../Map';
import './brewIndex.css';



export default class BrewIndex extends Component {
    state = {
        breweries: [],
        currentUser: null
    }

    componentDidMount () {
        // let { breweries } = this.state;

        axios('/test')
        .then(res => { 
            this.setState({ breweries: res.data.response.venues })
        })
        .catch(err => {
            debugger
        })
        this.setState({ currentUser: this.props.currentUser})
        
    }   

    render() {
        let { breweries } = this.state;
        let { currentUser } = this.props;

        return(
            <div className="grid container">
                <h1 className="brewIndexTitle">BREWERY INDEX</h1>
                <aside className="aspect-ratio">/</aside>
                <article>
                    <div className="grid absolute-fill main">
                        <div className="mapContainer aspect-ration">
                            <Map breweries={breweries} />
                        </div>
                        <div className="breweriesContainer aspect-ration">
                            <ul>
                                { breweries.map((brewery, i) => {
                                return <div key={i}>
                                        
                                        <Brewery 
                                            key={i}
                                            currentUser={ currentUser }
                                            brewery={ brewery }
                                            breweries={ breweries }
                                            onClick={this.handleClick}
                                        />
                                    {/* <a href="/brewShow/${brewery.id}">{brewery.name}</a> */}
                                    </div>

                                })}
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}