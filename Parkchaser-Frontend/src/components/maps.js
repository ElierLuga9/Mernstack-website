import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { styles } from '../styles/mapStyle';

import '../styles/Maps.css';

import Rating from './Rating';

const DEFAULT_MAP_LOCATION = { lat: 37.09024, lng: -95.712891 };
const DEFAULT_MAP_ZOOM = 5;


class Map extends Component {

	static defaultProps = {
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCIW48wqv3oz7ZgL8Q8vSQUwJ3xfQjjeEM&v=3.exp&libraries=geometry,drawing,places",
	}

	constructor(props) {
		super(props);
		this.state = {
			isOpen: [],
			places: []
		}
		this.openInfoWindow = this.openInfoWindow.bind(this);
	}

	CMap = withScriptjs(withGoogleMap(props =>
		<GoogleMap
			defaultZoom={DEFAULT_MAP_ZOOM}
			defaultCenter={DEFAULT_MAP_LOCATION}
			options={{
				styles: styles,
				disableDefaultUI: false
			}}

		>
			{props.children}
		</GoogleMap>
	));
	onMarkerClustererClick = () => (markerClusterer) => {
		const clickedMarkers = markerClusterer.getMarkers();
		console.log(`Current clicked markers length: ${clickedMarkers.length}`)
		console.log(clickedMarkers)
	}
	openInfoWindow(e, index) {
		var temp = this.state.isOpen;
		temp[index] = true;
		this.setState({
			isOpen: temp
		})
	}
	closeInfoWindow(e, index) {
		var temp = this.state.isOpen;
		temp[index] = false;
		this.setState({
			isOpen: temp
		})
	}


	componentWillReceiveProps(next) {
		//Filter Data
		var places = next.places;

		//Set data
		this.setState({
			places: places
		})
	}
	render() {
		var places = this.state.places;
		return (
			<Fragment>
				<this.CMap
					googleMapURL={this.props.googleMapURL}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div className='mainMap' style={this.props.type === 'state' ? { height: '450px' } : null} />}
					mapElement={<div style={{ height: `100%` }} />}
					center={DEFAULT_MAP_LOCATION}
				>
					<MarkerClusterer
						onClick={this.onMarkerClustererClick}
						gridSize={60}
						averageCenter
						enableRetinaIcons
						styles={[
							{
								url: "/PNG/marker/m1.png",
								height: 53,
								width: 53,
								fontFamily: "Lato",
								textColor: "#000",
							},
							{
								url: "/PNG/marker/m2.png",
								height: 56,
								width: 56,
								fontFamily: "Lato",
								textColor: "#000",
							},
							{
								url: "/PNG/marker/m3.png",
								height: 66,
								width: 66,
								fontFamily: "Lato",
								textColor: "#000",
							},
							{
								url: "/PNG/marker/m4.png",
								height: 78,
								width: 78,
								fontFamily: "Lato",
								textColor: "#000",
							},
							{
								url: "/PNG/marker/m5.png",
								height: 90,
								width: 90,
								fontFamily: "Lato",
								textColor: "#000",
							}
						]}
					>
						{
							places.map((e, index) => (
								<Marker key={index}
									position={{ lat: e.lat, lng: e.lng }}
									onClick={(e) => this.openInfoWindow(e, index)}
								>
									{
										this.state.isOpen[index] &&
										<InfoWindow
											onCloseClick={(e) => this.closeInfoWindow(e, index)}>
											<div className='infoWindowView'>
												<div>
													{e.photo !== undefined ?
														<img className='markerImg' alt='img' src={'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + e.photo.width + '&photoreference=' + e.photo.photo_reference + '&key=' + this.props.API_KEY} />
														: undefined
													}
												</div>
												<div className='markerText'>
													<Rating value={e.rating} />
													<p className='text2' style={{ fontSize: '15px', color: 'white', marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>{e.name}</p>
													<Link
														to={{
															pathname: '/skateparks/' + e.name.replace(/\s/g, '-') + '/' + e.place_id,
														}}
													>
														<p className='textClickable' style={{ fontSize: '15px' }} > View Details </p>
													</Link>
												</div>
											</div>
										</InfoWindow>
									}
								</Marker>
							))
						}
					</MarkerClusterer>

				</this.CMap>
			</Fragment >
		);
	}
}


const mapStateToProps = state => ({
	places: state.placeReducer.places
});


export default connect(mapStateToProps, null)(withRouter(Map));
