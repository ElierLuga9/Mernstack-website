import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";

import MetaTags from 'react-meta-tags';
import { PacmanLoader } from 'react-spinners';

import { getPlacesFromDB, setPathname, getRecentBlogs } from '../actions';
import Rating from '../components/Rating';
import SidePanelInfo from '../components/sidePanelInfo';
import PostList from '../components/postList';
import StateMap from '../components/stateMap';

import { GOOGLE_KEY } from '../lib/apikey';
import { statename } from '../lib/statename';

import '../styles/StatePage.scss';


class State extends Component {

	constructor(props) {
		super(props);
		this.state = ({
			stateplaces: [],
			stateindex: -1,
			visible_count: 10,
			adsLoaded: false
		});
		var history = this.props.history;
		history.listen((location) => {
			this.props.setPathname(location.pathname);
		});

		this.loadmore = this.loadmore.bind(this);
	}

	componentDidMount() {
		this.props.getPlacesFromDB();
		this.props.getRecentBlogs();

		try {
			window._mNHandle.queue.push(function () {
				window._mNDetails.loadTag("285451247", "728x90", "285451247");
			});
		}
		catch (error) { }
	}
	checkAddressMatch(name, stateid) {
		var temp = name;
		if (stateid === 'PR') {
			if (temp.indexOf('Puerto Rico') !== -1)
				return true;
		} else {
			var length = temp.lastIndexOf(',');
			temp = temp.substring(length - 8, length - 6);
			if (temp.indexOf(stateid) !== -1)
				return true;
		}
		return false;
	}
	componentWillReceiveProps(nextProp) {
		var name = this.props.match.params.statename;
		var data = nextProp.places;

		var stateindex = statename.findIndex(obj => obj.name.replace(/\s/g, '-') + '-Skateparks' === name);

		var temp = [];
		var stateid = statename[stateindex].abbreviation;
		for (var i = 0; i < data.length; i++) {
			if (this.checkAddressMatch(data[i].address, stateid))
				temp.push(data[i]);
		}

		this.setState({
			stateindex: stateindex,
			stateplaces: temp
		});
	}
	componentDidUpdate() {
		//Ads Initializer
		/*if (!this.state.adsLoaded) {
			let elements = document.getElementsByClassName("adsbygoogle");
			for (let i = 0; i < elements.length; i++)
				elements[i].innerHTML = '';

			for (let i = 0; i < 4; i++) {
				(window.adsbygoogle = window.adsbygoogle || []).push({});
			}
			this.setState({ adsLoaded: true });
		}*/
	}

	loadmore() {
		const total_length = this.state.stateplaces.length;
		const visible_count = this.state.visible_count;

		if (visible_count < total_length && this.state.stateplaces.length > 9) {
			if (visible_count + 10 < total_length)
				this.setState({
					visible_count: visible_count + 10
				})
			else
				this.setState({
					visible_count: total_length
				})
		}
	}

	render() {
		const recentBlogs = this.props.recentBlogs;
		var data = this.state.stateplaces;

		var visible_data = data.slice(0, this.state.visible_count);
		var stateindex = this.state.stateindex;

		return (
			<div>
				{this.state.stateindex !== -1 ?
					<div className='mainContainer' style={{ minHeight: '2100px' }}>
						<MetaTags>
							<title>{statename[stateindex].name} Skateparks - Find Skateparks Near Me at Parkchaser</title>
							<meta name="description" content={"Find skateparks near me in " + statename[stateindex].name + ". Parkchaser skatepark map lists every skatepark in " + statename[stateindex].name + " & skateparks for every state. Check out our skatepark map."} />
						</MetaTags>

						<div className='mainPanel'>
							<div style={{ width: '100%' }}>
								<h1 style={{ textTransform: 'uppercase' }}>
									There are {data.length} skateparks in  {statename[stateindex].name} </h1>
							</div>

							<div id="285451247" style={{ margin: '30px 0px', height: '60px' }} />

							<div className='statemap-container' style={{ marginBottom: '20px' }}>
								<StateMap API_KEY={GOOGLE_KEY} state={statename[this.state.stateindex].abbreviation} index={stateindex} />
								<div className='gridBack' />
							</div>



							{
								visible_data.map((e, index) => (
									<div key={index} >
										<div className='cardContainer'>
											<div className='cardImageContainer'>
												{
													e.photo !== undefined ?
														<img style={{ width: '230px', height: '150px' }} alt='img'
															src={'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + e.photo.width + '&photoreference=' + e.photo.photo_reference + '&key=' + GOOGLE_KEY} /> :
														<img style={{ width: '230px', height: '150px' }} alt='img' src='/PNG/Parkchaser-Image.png' />
												}
											</div>
											<div style={{ paddingLeft: '20px' }}>
												<h2 style={{ textTransform: 'uppercase', fontSize: '20pt', marginBottom: '10px' }}>{e.name}</h2>
												<div className='ratingContainer'>
													<Rating value={e.rating} />
												</div>
												<p style={{ fontSize: '18px' }}>{e.address}</p>
												<Link
													to={{
														pathname: '/skateparks/' + e.name.replace(/\s/g, '-').replace('/', '-') + '/' + e.place_id,
													}}
												>
													<p style={{ fontSize: '18px', color: '#068DBF', cursor: 'pointer' }}> Check out this skatepark</p>
												</Link>
											</div>
										</div>
										{/*index % 3 === 2 && index < 9 &&
											<ins className='adsbygoogle'
												style={{ display: 'block' }}
												data-ad-format='fluid'
												data-ad-layout-key='-f3+2p+cp-a5-a4'
												data-ad-client='ca-pub-4654547222186915'
												data-ad-slot='9058513703'></ins>
										*/}
									</div>
								))}

							<div style={{ textAlign: 'center' }}>
								{
									data.length !== this.state.visible_count &&
									<button className='mainbutton' style={{ width: '200px' }} onClick={this.loadmore}> LOAD MORE RESULTS </button>
								}
							</div>

						</div >

						<div className='sidePanel'>
							<SidePanelInfo />

							<div>
								<h3>RECENT POSTS</h3>
								<PostList blogs={recentBlogs} />
							</div>

						</div>

					</div> :
					<div style={{ width: '100%', height: '500px', alignItems: 'center', display: 'flex', justifyContent: 'center', boxSizing: 'border-box' }} >
						<PacmanLoader
							sizeUnit={"px"}
							size={40}
							color={'#A4DA2A'}
							loading={this.state.loading}
						/>
					</div>
				}
			</div >

		);
	}
}

const mapStateToProps = state => ({
	places: state.placeReducer.places,
	topCities: state.placeReducer.topCity,
	recentBlogs: state.blogReducer.recentBlogs
});

const mapDispatchToProps = dispatch => ({
	getPlacesFromDB: () => dispatch(getPlacesFromDB()),
	setPathname: (path) => dispatch(setPathname(path)),
	getRecentBlogs: () => dispatch(getRecentBlogs())
});

export default connect(mapStateToProps, mapDispatchToProps)(State);
