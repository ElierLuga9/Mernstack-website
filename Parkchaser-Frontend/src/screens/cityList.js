import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from "react-router-dom";

import MetaTags from 'react-meta-tags';

import SidePanelInfo from '../components/sidePanelInfo';
import CityMap from '../components/cityMapTotal';
import ThreeSkateParks from '../components/threeSkateParks';
import PostList from '../components/postList';

import { GOOGLE_KEY } from '../lib/apikey';

import {
	getPlaces, setCurrentLocation,
	getPlacesFromDB
} from '../actions';

import { getCurrentLocation } from '../lib/api';
import { setPathname, getRecentBlogs } from '../actions';

import { statename } from '../lib/statename';

import '../styles/Index.scss';

class CityList extends Component {

	constructor(props) {
		super(props);
		this.mobileAdRef = React.createRef();

		var history = this.props.history;
		history.listen((location) => {
			this.props.setPathname(location.pathname);
		});

		this.mobileSelectorChange = this.mobileSelectorChange.bind(this);
		this.mobileCitySelectorChange = this.mobileCitySelectorChange.bind(this);
	}

	async componentDidMount() {

		this.props.setPathname('/cities');

		this.props.getPlacesFromDB();
		this.props.getRecentBlogs();

		var currentPos = await getCurrentLocation();
		this.props.setCurrentPos(currentPos);

		//Ads Initializer
		for (let i = 0; i < 4; i++)
			(window.adsbygoogle = window.adsbygoogle || []).push({});
	}

	getStateIndex(name) {
		var index = -1;
		var temp = name;
		if (temp.indexOf('Puerto Rico') !== -1)
			index = 39;
		else {
			var length = temp.lastIndexOf(',');
			temp = temp.substring(length - 8, length - 6);
			index = statename.findIndex(obj => obj.abbreviation === temp);

		}
		if (index === -1) {
			//	console.log('Can not find' + name);
		}
		return index;
	}
	mobileSelectorChange(event) {
		var index = event.target.value;
		var url = '/states/' + statename[index].name.replace(/\s/g, '-') + '-Skateparks';
		this.props.history.push(url);
	}
	mobileCitySelectorChange(event) {
		var index = event.target.value;
		var e = this.props.topCity[index];
		var url = '/cities/' + e.cityName.replace(/\s/g, '-') + '-Skateparks';
		this.props.history.push(url);
	}

	goToBlog(blog) {
		this.props.history.push('/blog/' + blog.title.replace(/\s/g, '-').replace('?', '') + '/' + blog._id);
	}

	render() {
		var places = this.props.places;
		var topCity = this.props.topCity;
		const recentBlogs = this.props.recentBlogs;

		//Count Parks by State
		var cnt = [];
		for (var i = 0; i < 52; i++)
			cnt.push(0);
		for (i = 0; i < places.length; i++) {
			var index = this.getStateIndex(places[i].address);
			cnt[index]++;
		}

		//Random Skateparks
		const max = places.length - 1;
		let randomPlaces = [];
		if (max !== -1) {
			const pl1 = parseInt(Math.random() * max), pl2 = parseInt(Math.random() * max), pl3 = parseInt(Math.random() * max);
			randomPlaces = [places[pl1], places[pl2], places[pl3]];
		}
		return (
			<div>
				<MetaTags>
					<title>Skateparks By City - Find Skateparks Near Me at Parkchaser</title>
					<meta name="description" content="Find top cities with the most skateparks in the US. Find the nearest skatepark by city or local skateparks near me. US Skatepark Map & Indoor Skatepark Map." />
				</MetaTags>


				<div className='mainContainer' style={{ minHeight: '400px' }}>

					<div className='mainPanel'>

						<h1 style={{ textTransform: 'uppercase' }}>Skateparks Near Me By City</h1>
						<p style={{ marginBottom: '40px', lineHeight: '25px' }}>
							These are the top 20 cities (and borough) in the US offering the most skateparks. Find skateparks around the country, a local skatepark near you or plan your #skatecation with #parkchaser.
						</p>

						<ins className='adsbygoogle'
							style={{ display: 'block', marginBottom: '50px' }}
							data-ad-client='ca-pub-4654547222186915'
							data-ad-slot='8708355457'
							data-ad-format='horizontal'
							data-adtest='on' />
						<div className='mapContainer'>
							<CityMap API_KEY={GOOGLE_KEY} />
							<div className='gridBack' />
						</div>


						{topCity.length !== 0 &&
							<div className='mobile-state-selector' >

								<h2 style={{ color: 'white', margin: '10px', textTransform: 'uppercase' }}>Top Skatepark Cities</h2>

								<select className='mobile-selector' onChange={this.mobileCitySelectorChange}>
									<option>Select a City</option>
									{topCity.map((e, index) => (
										<option value={index} key={index} id={index}>
											{e.cityName} ({e.count})
										</option>
									))}
								</select>
							</div>
						}
						<div className='desktop-state-selector' style={{ marginTop: '50px' }}>
							{topCity.length !== 0 &&
								<h2 style={{ marginBottom: '30px', textTransform: 'uppercase' }}>Top Skatepark Cities</h2>
							}
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>


								<div className='state-items'>
									{topCity.map((e, index) => (
										index < 5 &&

										<Link key={index}
											to={{
												pathname: '/cities/' + e.cityName.replace(/\s/g, '-') + '-Skateparks',
											}}
										>

											<p className='textClickable' style={{ marginBottom: '8px' }}> {e.cityName} ({e.count})</p>
										</Link>
									))}
								</div>
								<div className='state-items'>
									{topCity.map((e, index) => (
										index >= 5 && index < 10 &&
										<Link key={index}
											to={{
												pathname: '/cities/' + e.cityName.replace(/\s/g, '-') + '-Skateparks',
											}}
										>

											<p className='textClickable' style={{ marginBottom: '8px' }}> {e.cityName} ({e.count})</p>
										</Link>
									))}
								</div>
								<div className='state-items'>
									{topCity.map((e, index) => (
										index >= 10 && index < 15 &&
										<Link key={index}
											to={{
												pathname: '/cities/' + e.cityName.replace(/\s/g, '-') + '-Skateparks',
											}}
										>

											<p className='textClickable' style={{ marginBottom: '8px' }}> {e.cityName} ({e.count})</p>
										</Link>
									))}
								</div>
								<div className='state-items'>
									{topCity.map((e, index) => (
										index >= 15 && index < 20 &&
										<Link key={index}
											to={{
												pathname: '/cities/' + e.cityName.replace(/\s/g, '-') + '-Skateparks',
											}}
										>

											<p className='textClickable' style={{ marginBottom: '8px' }}>  {e.cityName} ({e.count})</p>
										</Link>
									))}
								</div>
							</div>

						</div>
						<ins className='adsbygoogle'
							style={{ display: 'block', marginTop: '20px', marginBottom: '40px' }}
							data-ad-client='ca-pub-4654547222186915'
							data-ad-slot='8708355457'
							data-ad-format='horizontal'
							data-adtest='on' />

						<h2 style={{ marginTop: '80px' }}> FIND A NEW SKATEPARK</h2>
						<ThreeSkateParks parks={randomPlaces} />
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
				</div >
			</div >
		);
	}
}

const mapStateToProps = state => ({
	places: state.placeReducer.places,
	topCity: state.placeReducer.topCity,
	recentBlogs: state.blogReducer.recentBlogs
});

const mapDispatchToProps = dispatch => ({
	getPlaces: () => dispatch(getPlaces()),
	setCurrentPos: (currentPos) => dispatch(setCurrentLocation(currentPos)),

	getPlacesFromDB: () => dispatch(getPlacesFromDB()),

	getRecentBlogs: () => dispatch(getRecentBlogs()),
	setPathname: (path) => dispatch(setPathname(path))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CityList));
