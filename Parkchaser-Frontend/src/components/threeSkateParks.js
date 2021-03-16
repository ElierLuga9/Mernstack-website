import React, { Component } from 'react';
import { withRouter } from "react-router";
import Rating from './Rating';
import { GOOGLE_KEY } from '../lib/apikey';

class ThreeSkateParks extends Component {
    render() {
        return (
            <div className='card-wrapper'>
                {
                    this.props.parks.map((e, index) => (
                        <div key={index} className='cardContainerRandom'>
                            <div style={{ cursor: 'pointer', textAlign: 'center' }}
                                onClick={() => this.props.history.push('/skateparks/' + e.name.replace(/\s/g, '-').replace('/', '-') + '/' + e.place_id)}>
                                {
                                    e.photo !== undefined ?
                                        <img style={{ width: '100%', height: '150px' }} alt='img'
                                            src={'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + e.photo.width + '&photoreference=' + e.photo.photo_reference + '&key=' + GOOGLE_KEY} /> :
                                        <img style={{ width: '100%', height: '150px' }} alt='img' src='/PNG/Parkchaser-Image.png' />
                                }
                                <h2 style={{ textTransform: 'uppercase', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{e.name}</h2>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div className='ratingContainerRandom'>
                                    <Rating value={e.rating} />
                                </div>
                                <p style={{ fontSize: '16px' }}>{e.address}</p>
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
}

export default withRouter(ThreeSkateParks);
