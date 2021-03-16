import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";
import { PacmanLoader } from 'react-spinners';

import MetaTags from 'react-meta-tags';

import { GetPlaceData } from '../lib/api';
import { getPlacesFromDB, setPathname, getRecentBlogs } from '../actions';

import SatMap from '../components/satelliteMap';
import Rating from '../components/Rating';
import SidePanelInfo from '../components/sidePanelInfo';
import PostList from '../components/postList';
import NotFound from './404';

import { statename } from '../lib/statename';
import { withRouter } from 'react-router'

import { GOOGLE_KEY } from '../lib/apikey';

import '../styles/Detail.scss';

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1);  // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
		;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180)
}

class Detail extends Component {

	constructor(props) {
		super(props)
		this.state = {
			placeData: [],
			viewerIsOpen: false,
			viewerIndex: 0,
			nearby: [],
			adsLoaded: false
		}
		this.mobileAdRef = React.createRef();

		var history = this.props.history;
		this.props.setPathname(history.location.pathname);

		history.listen((location) => {
			this.props.setPathname(location.pathname);
		});

		this.openGallery = this.openGallery.bind(this);
		this.closeGallery = this.closeGallery.bind(this);
	}

	getStateIndexFromAddress(addresss) {
		var temp = addresss;
		var length = temp.lastIndexOf(',');
		temp = temp.substring(length - 8, length - 6);
		var index = statename.findIndex(obj => obj.abbreviation === temp);
		return index;
	}
	componentDidMount() {
		this.props.getPlacesFromDB();
		this.props.getRecentBlogs();
	}
	async componentWillReceiveProps(nextProp) {
		var placeData = await GetPlaceData(this.props.match.params.placeid);

		this.setState({
			placeData: placeData
		});
		if (placeData !== undefined) {
			const mylocation = placeData.geometry.location;
			let filtereList = [];
			const placeList = nextProp.places;

			for (var i = 0; i < placeList.length; i++) {
				if (getDistanceFromLatLonInKm(mylocation.lat, mylocation.lng, placeList[i].lat, placeList[i].lng) <= 20 && placeList[i].place_id !== placeData.place_id)
					filtereList.push(placeList[i]);
			}
			this.setState({
				nearby: filtereList
			});


		}
	}
	componentDidUpdate() {
		//Ads Initializers
		if (!this.state.adsLoaded && this.state.placeData.place_id !== undefined) {
			let elements = document.getElementsByClassName("adsbygoogle");
			for (let i = 0; i < elements.length; i++)
				elements[i].innerHTML = '';

			for (let i = 0; i < 5; i++) {
				(window.adsbygoogle = window.adsbygoogle || []).push({});
			}
			this.setState({ adsLoaded: true });
		}
	}
	openGallery(e, photo) {
		this.setState({
			viewerIsOpen: true,
			viewerIndex: photo.index
		})
	}
	closeGallery() {
		this.setState({
			viewerIsOpen: false,
			viewerIndex: 0
		})
	}

	formatDate(date) {
		var d = new Date(date * 1000);
		var month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [month, day, year].join('-');
	}

	render() {
		const recentBlogs = this.props.recentBlogs;

		var detail = this.state.placeData;
		if (detail === undefined)
			return <NotFound />;

		var photos = detail.photos;
		var reviews = detail.reviews;

		var position = { lat: 0, lng: 0 };
		if (detail.geometry !== undefined)
			position = detail.geometry.location;

		//	var currentPos = this.props.currentPos;
		//Generate Direction Link
		/*	var directionURL = 'https://maps.google.com/maps/dir/?api=1&origin=';
			directionURL += currentPos.lat;
			directionURL += ",";
			directionURL += currentPos.lng;
			directionURL += '&destination=';
			directionURL += position.lat;
			directionURL += ",";
			directionURL += position.lng;
	*/
		//Generate Review Link
		//		var reviewURL = 'comgooglemaps://maps.google.com/maps/place/?q=place_id:';
		var reviewURL = 'https://www.google.com/maps/search/?api=1&query=<address>&query_place_id=';
		reviewURL += detail.place_id;


		var IMAGES = [];
		if (photos !== undefined) {
			var photo_cnt = photos.length;
			if (photo_cnt > 3)
				photo_cnt = 3;

			for (var i = 0; i < photo_cnt; i++) {
				var e = photos[i];
				var temp = {
					src: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + e.width + '&photoreference=' + e.photo_reference + '&key=' + GOOGLE_KEY,
					width: e.width,
					height: e.height
					//	thumbnail: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + e.width + '&photoreference=' + e.photo_reference + '&key=' + 'AIzaSyCIW48wqv3oz7ZgL8Q8vSQUwJ3xfQjjeEM',
				}
				IMAGES.push(temp);
			}
		}
		if (IMAGES.length === 0)
			IMAGES.push({
				src: '/PNG/Parkchaser-Image.png',
				width: 230,
				height: 150
			})


		let city = '', state = '';
		if (detail.address_components !== undefined) {
			let cityData = detail.address_components.find((addr) => addr.types.indexOf('locality') !== -1);
			if (cityData === undefined)
				cityData = detail.address_components.find((addr) => addr.types.indexOf('administrative_area_level_2') !== -1);
			if (cityData !== undefined)
				city = cityData.long_name;

			const stateData = detail.address_components.find((addr) => addr.types.indexOf('administrative_area_level_1') !== -1);
			if (stateData !== undefined)
				state = stateData.long_name;
		}
		return (
			<div>
				<MetaTags>
					<title>{detail.name} - Find a local Skatepark on Parkchaser</title>
					<meta name="description" content={detail.name + " is on our skatepark map. Find a local skatepark and go skate! Parkchaser US skatepark map."} />
				</MetaTags>
				{
					detail.place_id !== undefined ?
						< div className='mainContainer' >
							<div className='mainPanel' >
								<h1 style={{ textTransform: 'uppercase', paddingTop: '0px', marginBottom: '10px' }}> {detail.name} </h1>
								{(city !== '' || state !== '') &&
									<h2 className='skatepark-subtitle'>
										{`Skatepark in ${city !== '' && city}${city !== '' && state !== '' && ','} ${state !== '' && state}`}</h2>}

								<ins className='adsbygoogle'
									style={{ display: 'block', margin: '30px 0px', minHeight: '100px', width: '100%' }}
									data-ad-client='ca-pub-4654547222186915'
									data-ad-slot='8708355457'
									data-ad-format='horizontal'
									data-adtest='on' />

								<div style={{ backgroundColor: 'white' }}>
									<SatMap position={position} />
									<div className='gridBack' />
									<div>
										<div style={{ display: 'flex', padding: '30px' }}>
											<div style={{ width: '100%' }}>
												<div className='ratingText' style={{ alignItems: 'center', margin: '5px' }}>
													<div style={{ width: '130px' }}>
														<Rating value={detail.rating} />
													</div>
													{detail.user_ratings_total !== undefined &&
														< a href={reviewURL} target="_blank" rel="noopener noreferrer" >
															<p className='textClickable' >{detail.user_ratings_total} Google Reviews</p>
														</a>
													}
												</div>
												<div style={{ marginBottom: '10px' }}>
													<p className='text3'>{detail.formatted_address}</p>
													<p className='text3'>{detail.formatted_phone_number}</p>
												</div>
												<div style={{ marginBottom: '10px' }}>
													<a className='textClickable' target='_blank' rel="noopener noreferrer" href={reviewURL}>
														<p style={{ fontSize: '18px', display: 'inline-block' }}>Get Direction</p>
													</a>
												</div>
												{detail.website !== undefined &&
													<div style={{ marginBottom: '10px' }}>
														<a className='textClickable' target='_blank' rel="noopener noreferrer" href={detail.website}>
															<p style={{ fontSize: '18px', display: 'inline-block' }}>View Website</p>
														</a>
													</div>
												}
											</div>
										</div>
									</div>
								</div>
								{this.state.nearby.length > 0 &&
									<div>
										<h3 style={{ marginTop: '30px', marginBottom: '25px' }}>NEARBY SKATEPARKS</h3>
										<hr style={{ border: '1px solid #DEDEDE' }}></hr>
									</div>}
								<div className='nearby-skateparks'>
									{
										this.state.nearby.map((e, index) => (
											<div style={{ paddingRight: '20px' }} key={index}>
												<Link
													onClick={() => this.navigateTo('/skateparks/' + e.place_id + '/' + e.name.replace(/\s/g, '-'))}
													to={{ pathname: '/skateparks/' + e.name.replace(/\s/g, '-').replace('/', '-') + '/' + e.place_id, }}>
													<p className='textClickable' style={{ marginBottom: '15px' }} > {e.name} </p>
												</Link>
											</div>
										))
									}
								</div>
								<ins className='adsbygoogle'
									style={{ display: 'block', minHeight: '100px', width: '100%' }}
									data-ad-client='ca-pub-4654547222186915'
									data-ad-slot='8708355457'
									data-ad-format='horizontal'
									data-adtest='on' />
								<div className='photo' >
									<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
										<h3 className='text2'>PHOTOS</h3>
										<a className='textClickable' style={{ marginBottom: '10px', textDecoration: 'none' }} target='_blank' rel="noopener noreferrer" href={reviewURL}>
											<p style={{ fontSize: '15px' }}>+ Submit Your Photos</p>
										</a>
									</div>
									<div className='mobile-image-viewer' >
										<Gallery photos={IMAGES} direction={"column"} onClick={(e, photo) => this.openGallery(e, photo)} />
										<ModalGateway>
											{this.state.viewerIsOpen ? (
												<Modal onClose={this.closeGallery}>
													<Carousel
														currentIndex={this.state.viewerIndex}
														views={IMAGES.map(x => ({
															...x,
															srcset: x.srcSet,
															caption: x.title
														}))}
													/>
												</Modal>
											) : null}
										</ModalGateway>
									</div>
									<div className='desktop-image-viewer' >
										<Gallery photos={IMAGES} direction={"row"} onClick={(e, photo) => this.openGallery(e, photo)} />
										<ModalGateway>
											{this.state.viewerIsOpen ? (
												<Modal onClose={this.closeGallery}>
													<Carousel
														currentIndex={this.state.viewerIndex}
														views={IMAGES.map(x => ({
															...x,
															srcset: x.srcSet,
															caption: x.title
														}))}
													/>
												</Modal>
											) : null}
										</ModalGateway>
									</div>
								</div>
								<ins className='adsbygoogle'
									style={{ display: 'block', margin: '30px 0px', minHeight: '100px', width: '100%' }}
									data-ad-client='ca-pub-4654547222186915'
									data-ad-slot='8708355457'
									data-ad-format='horizontal'
									data-adtest='on' />
								<div >
									<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
										<h3 className='text2'>REVIEWS</h3>
										<a className='textClickable' style={{ marginBottom: '10px', textDecoration: 'none' }} target='_blank' rel="noopener noreferrer" href={reviewURL}>
											<p style={{ fontSize: '15px' }}>+ Write a Review</p>
										</a>
									</div>
									{reviews !== undefined && reviews.map((e, index) => (

										<div key={index} className='reviewCard'>
											<hr style={{ border: '1px solid #DEDEDE' }}></hr>
											<div style={{ width: '130px' }}>
												<Rating value={e.rating} />
											</div>

											<p style={{ marginTop: '10px' }}> {e.text} </p>
											<p style={{ float: 'left', fontStyle: 'italic', fontWeight: '500', marginTop: '10px' }}> {this.formatDate(e.time)} , {e.author_name}</p>
										</div>
									))}
								</div>

							</div>
							<div className='sidePanel'>
								<SidePanelInfo />
								<ins className='adsbygoogle'
									style={{ display: 'block', margin: '40px 0px' }}
									data-ad-client='ca-pub-4654547222186915'
									data-ad-slot='8708355457'
									data-ad-format='rectangle, horizontal'
									data-adtest='on' />
								<div>
									<h3>RECENT POSTS</h3>
									<PostList blogs={recentBlogs} />
								</div>
								<ins className='adsbygoogle'
									style={{ display: 'block', margin: '40px 0px' }}
									data-ad-client='ca-pub-4654547222186915'
									data-ad-slot='8708355457'
									data-ad-format='rectangle, horizontal'
									data-adtest='on' />
							</div>
						</div > :
						< div style={{ width: '100%', height: '500px', alignItems: 'center', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }} >
							<PacmanLoader
								sizeUnit={"px"}
								size={40}
								color={'#A4DA2A'}
								loading={this.state.loading}
							/>
						</div>
				}
			</div>

		);
	}
}

const mapStateToProps = state => ({
	currentPos: state.placeReducer.currentPos,
	places: state.placeReducer.places,
	recentBlogs: state.blogReducer.recentBlogs
});

const mapDispatchToProps = dispatch => ({
	getPlacesFromDB: () => dispatch(getPlacesFromDB()),
	setPathname: (path) => dispatch(setPathname(path)),
	getRecentBlogs: () => dispatch(getRecentBlogs())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
