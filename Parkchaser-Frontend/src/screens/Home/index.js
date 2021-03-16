import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import MetaTags from 'react-meta-tags';
import Popup from 'reactjs-popup';

import Map from '../../components/maps';
//import InstaFeed from '../../components/Instafeed';

import Mailchimp from '../../components/mailchimpPopup';
import { GOOGLE_KEY } from '../../lib/apikey';

import {
	getPlaces, setCurrentLocation,
	getPlacesFromDB, diableMailchimp
} from '../../actions';

import SocialButton from '../../components/socialButton';

import { getCurrentLocation } from '../../lib/api';
import { setPathname, getRecentBlogs } from '../../actions';
import { statename } from '../../lib/statename';
import { extractImageFromHTML, extractText } from '../../util';

import '../../styles/Index.scss';

function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			mailchimpPopup: false
		}
		this.mobileAdRef = React.createRef();

		var history = this.props.history;
		history.listen((location) => {
			this.props.setPathname(location.pathname);
		});

		this.mobileSelectorChange = this.mobileSelectorChange.bind(this);
		this.mobileCitySelectorChange = this.mobileCitySelectorChange.bind(this);

		this.mailchimpClose = this.mailchimpClose.bind(this);
	}

	async componentDidMount() {
		try {
			window._mNHandle.queue.push(function () {
				window._mNDetails.loadTag("340043586", "728x90", "340043586");
			});
		}
		catch (error) { }

		this.props.setPathname('/');

		this.props.getPlacesFromDB();
		this.props.getRecentBlogs();

		var currentPos = await getCurrentLocation();
		this.props.setCurrentPos(currentPos);

		document.addEventListener('scroll', this.trackScrolling);

		//Ads Initializer
		for (let i = 0; i < 5; i++)
			(window.adsbygoogle = window.adsbygoogle || []).push({});
	}
	//Mailchimp scroll event functions
	isMiddle() {
		return window.pageYOffset >= window.innerHeight / 3 * 2;
	}


	componentWillUnmount() {
		document.removeEventListener('scroll', this.trackScrolling);
	}

	trackScrolling = () => {
		if (this.isMiddle() && this.props.mailchimp) {
			this.setState({
				mailchimpPopup: true
			})

			this.props.diableMailchimp();
			document.removeEventListener('scroll', this.trackScrolling);
		}
	};

	mailchimpClose() {
		this.setState({
			mailchimpPopup: false
		})
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
		//Count Parks by State
		var cnt = [];
		for (var i = 0; i < 52; i++)
			cnt.push(0);
		for (i = 0; i < places.length; i++) {
			var index = this.getStateIndex(places[i].address);
			cnt[index]++;
		}

		var recentBlogs = this.props.recentBlogs;
		const mailChimpPopup = localStorage.getItem('mailChimpPopup');
		console.log(mailChimpPopup)
		return (
			<div>
				<MetaTags>
					<title>Find a Park, Go Skate - Parkchaser Skatepark Map</title>
					<meta name="description" content="The most accurate US Skatepark Map & Indoor Skatepark Map. Find skateparks around the country and skateparks near you." />
				</MetaTags>

				<div style={{ maxWidth: '800px', margin: 'auto' }}>
					<h1 className='pageTitle' style={{ textAlign: 'center', marginTop: '50px' }}>FIND SKATEPARKS NEAR YOU</h1>
					<p className='pageDescription' style={{ textAlign: 'center' }}>
						Parkchaser features the most accurate and up to date and US skatepark directory anywhere. Find skateparks around the country, a local park near you or plan a #skatecation with #parkchaser. Find a Park, Go Skate.
					</p>

					<div id="340043586" style={{ margin: '30px 0px' }} />

					<div className='socialbutton-wrapper' style={{ marginTop: '0px', marginBottom: '40px' }}>
						<SocialButton type='facebook' />
						<SocialButton type='instagram' />
						<SocialButton type='twitter' />
					</div>
				</div>

				<ins className='adsbygoogle'
					style={{ display: 'block', marginBottom: '20px', textAlign: 'center' }}
					data-ad-client='ca-pub-4654547222186915'
					data-ad-slot='8708355457'
					data-ad-format='horizontal'
					data-adtest='on' />


				<Map API_KEY={GOOGLE_KEY} />
				<div className='mobile-state-selector' >
					<h2 style={{ color: 'white', margin: '10px', textTransform: 'uppercase' }}>Skateparks By State - {formatNumber(places.length)}</h2>
					<select className='mobile-selector' onChange={this.mobileSelectorChange}>
						<option>Select a State</option>
						{statename.map((e, index) => (
							<option value={index} key={index} id={index}>
								{e.name} ({cnt[index]})
							</option>
						))}
					</select>
				</div>

				<div className='whtieArea'>
					< ins className='adsbygoogle'
						style={{ display: 'block', width: '300px !important' }}
						data-ad-client='ca-pub-4654547222186915'
						data-ad-slot='8708355457'
						data-ad-format="horizontal"
						data-adtest='on' />
					<h2 className='title' style={{ marginTop: '100px' }}>
						THERE ARE {formatNumber(places.length)} SKATEPARKS ON OUR SKATEPARK MAP
					</h2>
					<div className='mainContainer' style={{ padding: '20px 0px' }}>
						<div className='mPanel' >
							<div className='guide'>
								<img alt='img' src='/PNG/Parkchaser-Image-rec.png' className='image' />
								<div className='text'>
									<h3 style={{ margin: '0px 0px 10px 0px', fontSize: '24px' }}>50 STATES, PLENTY OF SPOTS</h3>
									<p>We've located as many public skateparks in the US and mapped them out for you. Looking for the best skatepark in California? Or maybe the best states to find a skatepark while traveling? Start right here.</p>
									<Link key={index}
										to={{ pathname: '/states', }}>
										<p className='textClickable' style={{ marginTop: '20px', fontWeight: '600' }}> VIEW SKATEPARKS BY STATE</p>
									</Link>
								</div>
							</div>
							<div className='guide'>
								<img alt='img' src='/PNG/Parkchaser-Image-rec.png' className='image' />
								<div className='text'>
									<h3 style={{ margin: '0px 0px 10px 0px', fontSize: '24px' }}>TOP 20 SKATEPARK CITIES</h3>
									<p>There are the top 20 skatepark cities by number of parks. From Brooklyn to Los Angeles, we've got you covered.</p>
									<Link key={index}
										to={{ pathname: '/cities', }}>
										<p className='textClickable' style={{ marginTop: '20px', fontWeight: '600' }}> TOP SKATEPARK CITIES</p>
									</Link>
								</div>
							</div>
							< ins className='adsbygoogle'
								style={{ display: 'block', width: '300px !important' }}
								data-ad-client='ca-pub-4654547222186915'
								data-ad-slot='8708355457'
								data-ad-format="horizontal"
								data-adtest='on' />
						</div>
						<div className='sPanel sPanelMain' >
							<ins className='adsbygoogle'
								style={{ display: 'block', height: '100%' }}
								data-ad-client='ca-pub-4654547222186915'
								data-ad-slot='8708355457'
								data-ad-format="auto"
								data-adtest='on' />
						</div>
					</div>
				</div>

				<div className='mainContainer' style={{ padding: '40px 0px' }} >

					<div className='mainPanel' style={{ paddingLeft: '0px' }}>
						<div style={{ minHeight: '500px' }}>
							{recentBlogs.map((blog, index) =>
								index < 3 &&
								<div key={index} className='blogListItem' >
									<div className='blogImageArea'>
										<img src={extractImageFromHTML(blog.content)} alt='skateparkimage' className='blogImage' />
									</div>
									<div className='blogTextArea'>
										<div style={{ cursor: 'pointer' }}
											onClick={() => this.goToBlog(blog)}>
											<h3 className='blogTitle'>{blog.title}</h3>
										</div>
										<p className='blogTextContent'>{extractText(blog.content).substring(0, 200)} ...</p>
									</div>
									{index === 1 && <ins className='adsbygoogle'
										style={{ display: 'block' }}
										data-ad-format='fluid'
										data-ad-layout-key='-f3+2p+cp-a5-a4'
										data-ad-client='ca-pub-4654547222186915'
										data-ad-slot='9058513703'></ins>}
								</div>)}
						</div>

					</div>
					<div className='sidePanel sidePanelMain' style={{ paddingTop: '50px', paddingRight: '0px' }}>
						<ins className='adsbygoogle'
							style={{ display: 'block', height: '100%' }}
							data-ad-client='ca-pub-4654547222186915'
							data-ad-slot='8708355457'
							data-ad-format="auto"
							data-adtest='on' />
					</div>
				</div >
				<Popup open={this.state.mailchimpPopup && !mailChimpPopup} closeOnDocumentClick={false}>
					<Mailchimp close={() => { this.mailchimpClose(); localStorage.setItem('mailChimpPopup', true); }} />
				</Popup>
			</div >
		);
	}
}

const mapStateToProps = state => ({
	places: state.placeReducer.places,
	topCity: state.placeReducer.topCity,
	//mailchimp popup flag
	mailchimp: state.placeReducer.mailchimp,
	recentBlogs: state.blogReducer.recentBlogs
});

const mapDispatchToProps = dispatch => ({
	getPlaces: () => dispatch(getPlaces()),
	setCurrentPos: (currentPos) => dispatch(setCurrentLocation(currentPos)),

	getPlacesFromDB: () => dispatch(getPlacesFromDB()),
	setPathname: (path) => dispatch(setPathname(path)),
	diableMailchimp: () => dispatch(diableMailchimp()),

	getRecentBlogs: () => dispatch(getRecentBlogs())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
