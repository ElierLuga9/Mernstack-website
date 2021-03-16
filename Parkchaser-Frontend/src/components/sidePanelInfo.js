import React, { Component } from 'react';


class SidePanelInfo extends Component {
    render() {
        return (
            <div style={{ marginBottom: '80px' }}>
                <div className='inpage-logo'>
                    <img className='inpage-logo-image' alt='img'
                        src={window.location.origin + '/PNG/second-logo.png'} />
                </div>
                <h4 className='sidenav-title'>PARKCHASER SKATEPARK MAP</h4>
                <div >
                    <p className='sidenav-description'>Welcome to Parkchaser, the most comprehensive US Skatepark Map. We're here to help you find a local park,  or one of the thousands across the country.</p>
                    <p className='sidenav-description'
                        style={{ fontStyle: 'italic', fontWeight: '500' }}>
                        Find a Park, Go Skate.</p>
                </div>
                <div className='socialbutton-wrapper'>
                    <a href='https://www.facebook.com/skateparkchaser/'
                        target="_blank" rel="noopener noreferrer" title="Facebook">
                        <button className='fa fa-facebook socialbutton'></button>
                    </a>

                    <a href='https://www.instagram.com/skateparkchaser/'
                        target="_blank" rel="noopener noreferrer" title="Instagram">
                        <button className='fa fa-instagram socialbutton'> </button>
                    </a>

                    <a href='https://twitter.com/parkchaser'
                        target="_blank" rel="noopener noreferrer" title="Twitter">
                        <button className='fa fa-twitter socialbutton'> </button>
                    </a>
                </div>
            </div>
        );
    }
}



export default SidePanelInfo;
