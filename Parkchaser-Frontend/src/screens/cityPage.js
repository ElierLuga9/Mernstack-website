import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";

import MetaTags from 'react-meta-tags';
import { PacmanLoader } from 'react-spinners';

import { getPlacesFromDB, setPathname, getRecentBlogs } from '../actions';
import Rating from '../components/Rating';
import SidePanelInfo from '../components/sidePanelInfo';
import PostList from '../components/postList';

import CityMap from '../components/cityMap';

import { GOOGLE_KEY } from '../lib/apikey';


import '../styles/StatePage.scss';

function getCityName(address) {
	var temp = address;
	var lastComma = temp.lastIndexOf(',');
	temp = temp.slice(0, lastComma);
	lastComma = temp.lastIndexOf(',');
	temp = temp.slice(0, lastComma);
	lastComma = temp.lastIndexOf(',');
	temp = temp.slice(lastComma + 1);
	return temp;
}

class State extends Component {

	constructor(props) {
		super(props);
		this.mobileAdRef = React.createRef();

		this.state = ({
			stateplaces: [],
			stateID: '',
			visible_count: 10,
			adsLoaded: false
		})

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

	componentWillReceiveProps(nextProp) {
		var name = this.props.match.params.cityname;
		var data = nextProp.places;


		var temp = [];

		var cityname = name.slice(0, name.length - 11).replace('-', ' ');

		var topCitylist = nextProp.topCities;
		var item = topCitylist.find(function (item) {
			return item.cityName.indexOf(cityname) !== -1;
		});

		if (item == null)
			return;
		var stateID = item.state.abbreviation;

		for (var i = 0; i < data.length; i++) {
			var address = data[i].address;

			if (getCityName(address).replace(/\s/g, '') === item.cityName.replace(/\s/g, '') && address.indexOf(item.state.abbreviation) !== -1)
				temp.push(data[i]);
		}
		this.setState({
			stateID: stateID,
			stateplaces: temp
		});
	}

	loadmore() {
		const total_length = this.state.stateplaces.length;
		const visible_count = this.state.visible_count;

		if (visible_count < total_length) {
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
	componentDidUpdate() {
		//Ads Initializer
		/*console.log(!this.state.adsLoaded, this.state.stateplaces.length > 6)
		if (!this.state.adsLoaded && this.state.stateplaces.length > 6) {
			let elements = document.getElementsByClassName("adsbygoogle");
			for (let i = 0; i < elements.length; i++)
				elements[i].innerHTML = '';

			for (let i = 0; i < 2; i++) {
				console.log(i);
				(window.adsbygoogle = window.adsbygoogle || []).push({});
			}
			this.setState({ adsLoaded: true });
		}*/
	}
	render() {
		const recentBlogs = this.props.recentBlogs;
		var data = this.state.stateplaces;

		var visible_data = data.slice(0, this.state.visible_count);

		//Use CityName instead of State Name
		var cityname = this.props.match.params.cityname.replace('-', ' ');
		cityname = cityname.slice(0, cityname.length - 11);


		return (
			<div>
				<MetaTags>
					<title>{cityname} Skateparks - Find Skateparks Near Me at Parkchaser</title>
					<meta name="description" content={"Find skateparks near me in " + cityname + ". Parkchaser skatepark map lists every skatepark in " + cityname + " & skateparks for every state. Check out our skatepark map."} />
				</MetaTags>
				{this.state.stateID !== '' ?
					<div className='mainContainer' style={{ minHeight: '2100px' }}>
						<div className='mainPanel'>
							<div style={{ width: '100%' }}>
								<h1 style={{ textTransform: 'uppercase' }}>There are {data.length} skateparks in  {cityname} </h1>
							</div>

							<div id="285451247" style={{ margin: '30px 0px', height: '60px' }} />

							<div className='statemap-container' style={{ marginBottom: '20px' }}>
								<CityMap API_KEY={GOOGLE_KEY} state={this.state.stateID} city={cityname} />
								<div className='gridBack' />
							</div>


							{
								visible_data.map((e, index) => (
									<div key={index}>
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
										{/*index % 3 === 2 && index < 7 &&
											<ins className='adsbygoogle'
												style={{ display: 'block', margin: '40px 0px' }}
												data-ad-client='ca-pub-4654547222186915'
												data-ad-slot='8708355457'
												data-ad-format='horizontal'
												data-adtest='on' />
										*/}
									</div>
								))}
							<div style={{ textAlign: 'center' }}>
								{
									data.length > this.state.visible_count &&
									<button className='mainbutton' style={{ width: '200px' }} onClick={this.loadmore}> LOAD MORE RESULTS </button>
								}
							</div>


						</div >

						<div className="sidePanel">
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
