import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import MetaTags from 'react-meta-tags';

import Map from '../components/maps';
import SidePanelInfo from '../components/sidePanelInfo';
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

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

class StateList extends Component {

	constructor(props) {
		super(props);
		this.mobileAdRef = React.createRef();

		var history = this.props.history;
		history.listen((location) => {
			this.props.setPathname(location.pathname);
		});

		this.mobileSelectorChange = this.mobileSelectorChange.bind(this);
	}

	async componentDidMount() {

		this.props.setPathname('/states');

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

	goToBlog(blog) {
		this.props.history.push('/blog/' + blog.title.replace(/\s/g, '-').replace('?', '') + '/' + blog._id);
	}

	render() {
		var places = this.props.places;
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
					<title>Skateparks By State - Find Skateparks Near Me at Parkchaser</title>
					<meta name="description" content="Find skateparks and indoor skateparks by state. Find local skateparks near me or around the country with Parkchaser. View Map." />
				</MetaTags>


				<div className='mainContainer' style={{ minHeight: '700px' }}>

					<div className='mainPanel'>
						<h1 className='pageTitle' style={{ paddingTop: '0px' }}>Skateparks near me by state</h1>
						<p className='pageDescription'>
							We've put together the most accurate and up to date US skatepark map around. What started out as a personal passion turned into something too good not to share. Check out this list of skateparks by state and get out there and start checking them out. Find skateparks around the country, a local skatepark near you or plan your #skatecation with #parkchaser.
						</p>

						<ins className='adsbygoogle'
							style={{ display: 'block', marginBottom: '50px' }}
							data-ad-client='ca-pub-4654547222186915'
							data-ad-slot='8708355457'
							data-ad-format='horizontal'
							data-adtest='on' />

						<div className='mapContainer'>
							<Map API_KEY={GOOGLE_KEY} type='state' />
							<div className='gridBack' />
						</div>
						<div className='mobile-state-selector' >
							<h2 className='mobile-state-selector-label'>We found {formatNumber(places.length)} Skateparks in the US </h2>
							<select className='mobile-selector' onChange={this.mobileSelectorChange}>
								<option>Select a State</option>
								{statename.map((e, index) => (
									<option value={index} key={index} id={index}>
										{e.name} ({cnt[index]})
									</option>
								))}
							</select>
						</div>
						<div className='desktop-state-selector'>
							<h2 style={{ marginBottom: '30px', marginTop: '50px', textTransform: 'uppercase' }}> We found {formatNumber(places.length)} Skateparks in the US </h2>

							<div style={{ display: 'flex', justifyContent: 'space-between' }}>


								<div className='state-items'>
									{statename.map((e, index) => (
										index < 13 &&

										<Link key={index}
											to={{
												pathname: '/states/' + e.name.replace(/\s/g, '-') + '-Skateparks',
											}}
										>

											<p className='textClickable' style={{ marginBottom: '8px' }}> {e.name} ({cnt[index]})</p>
										</Link>
									))}
								</div>
								<div className='state-items'>
									{statename.map((e, index) => (
										index >= 13 && index < 26 &&
										<Link key={index}
											to={{
												pathname: '/states/' + e.name.replace(/\s/g, '-') + '-Skateparks',
											}}
										>

											<p className='textClickable' style={{ marginBottom: '8px' }}> {e.name} ({cnt[index]})</p>
										</Link>
									))}
								</div>
								<div className='state-items'>
									{statename.map((e, index) => (
										index >= 26 && index < 39 &&
										<Link key={index}
											to={{
												pathname: '/states/' + e.name.replace(/\s/g, '-') + '-Skateparks',
											}}
										>

											<p className='textClickable' style={{ marginBottom: '8px' }}> {e.name} ({cnt[index]})</p>
										</Link>
									))}
								</div>
								<div className='state-items'>
									{statename.map((e, index) => (
										index >= 39 && index < 52 &&
										<Link key={index}
											to={{
												pathname: '/states/' + e.name.replace(/\s/g, '-') + '-Skateparks',
											}}
										>

											<p className='textClickable' style={{ marginBottom: '8px' }}> {e.name} ({cnt[index]})</p>
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

						<h2 className='randomSkateparksTitle' style={{ marginTop: '80px' }}>FIND A NEW SKATEPARK</h2>
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
				</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StateList));
