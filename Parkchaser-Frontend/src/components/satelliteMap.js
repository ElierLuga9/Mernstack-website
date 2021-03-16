import React, { Component, Fragment } from "react";

import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";

import { GOOGLE_KEY } from '../lib/apikey';

const DEFAULT_MAP_ZOOM = 18;

class SatMap extends Component {

	static defaultProps = {
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_KEY + "&v=3.exp&libraries=geometry,drawing,places",
	}


	CMap = withScriptjs(withGoogleMap(props => (
		this.props.position.lat !== undefined && <GoogleMap
			defaultZoom={DEFAULT_MAP_ZOOM}
			defaultCenter={this.props.position}
			options={{
				disableDefaultUI: false,
				mapTypeId: 'satellite',
				scrollwheel: false
			}}

		>
			{props.children}
		</GoogleMap>
	)));



	render() {
		return (
			<Fragment>
				{this.props.position.lat !== 0 && <this.CMap
					googleMapURL={this.props.googleMapURL}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div className='satMap' />}
					mapElement={<div style={{ height: `100%` }} />}
					center={this.props.position}
				>
					<Marker
						position={this.props.position}
					></Marker>

				</this.CMap>}
			</Fragment>
		);
	}
}



export default SatMap;
