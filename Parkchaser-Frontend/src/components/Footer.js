import React, { Component } from 'react';
import { connect } from 'react-redux';

import validator from 'validator';
import MailchimpSubscribe from "react-mailchimp-subscribe";

import { withRouter } from "react-router";
import { HashLink as Link } from 'react-router-hash-link';

import '../styles/Footer.css';

const mailChimpURL =
	"https://parkchaser.us4.list-manage.com/subscribe/post?u=66408fdca85c349340fc31640&amp;id=086d07347a";

class MailChimpForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email2: '',
			email2Valid: true
		}

		this.signUp = this.signUp.bind(this);
	}

	signUp() {
		this.setState({
			email2Valid: validator.isEmail(this.state.email2)
		})
		if (validator.isEmail(this.state.email2)) {
			this.props.subscribe({ EMAIL: this.state.email2 });
			this.setState({
				email2: '',
				email2Valid: true
			})
		}
	}

	render() {
		var status = this.props.status;
		var message = this.props.message;
		return (
			<div className="footer-list-top session2">
				<h3 style={{ marginBottom: '20px', fontSize: '18px', color: 'white' }}>GET THE NEWSLETTER</h3>
				<div className="input-group" >
					<input className={this.state.email2Valid ? 'emailinput inputform"' : 'errorinput'} placeholder="Enter your email" value={this.state.email2} onChange={(e) => { this.setState({ email2: e.target.value, email2Valid: validator.isEmail(this.state.email2) }) }} />
					<button onClick={this.signUp} className='mainbutton' style={{ width: '100px', height: '46px' }} >
						SEND IT
					</button>
				</div>
				<div style={{ marginTop: '10px' }}>
					{status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
					{
						status === "error" && (
							<div
								style={{ color: "red" }}
								dangerouslySetInnerHTML={{ __html: message }}
							/>
						)
					}
					{
						status === "success" && (
							<div
								style={{ color: "green" }}
								dangerouslySetInnerHTML={{ __html: message }}
							/>
						)
					}
				</div >
			</div>
		)
	}
}
class Home extends Component {

	render() {
		return (
			<div className='footerContainer'>
				<div className='gridBack'>

				</div>
				<div className="flex-rw">
					<div className="footer-list-top session1">
						<h3 style={{ marginBottom: '20px', fontSize: '18px', color: 'white' }}>ABOUT PARKCHASER</h3>
						<p style={{ fontSize: '15px', marginTop: '14px', color: 'white' }} >
							We've created Parkchaser to help support and grow the skate community. To do so, we've built the most up to date and accurate US skatepark directory anywhere.
							Find a park, go skate.
						</p>
						<Link
							to={{
								pathname: '/contact',
							}}
						>
							<p className='textClickable contact' style={{ fontSize: '15px', marginTop: '20px' }} >  Contact Us</p>
						</Link>
					</div>
					<MailchimpSubscribe
						url={mailChimpURL}
						render={({ subscribe, status, message }) => (
							<MailChimpForm status={status} message={message} subscribe={subscribe} />
						)}
					/>
					<div className="footer-list-top session3">
						<h3 style={{ marginBottom: '20px', fontSize: '18px', color: 'white' }}>FOLLOW US</h3>
						<div style={{ display: 'flex', marginLeft: '-10px' }}>
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
					<div className='mobile-widget' style={{ marginTop: '20px' }}>
						<Link
							to={{
								pathname: '/contact',
							}}
						>
							<button className='mobile-button' onClick={this.navigateToContact}>Contact Us</button>
						</Link>
						<Link
							to='/contact#newsletter'
						>
							<button className='mobile-button' >Get Our Newsletter</button>
						</Link>
					</div>
				</div>
				<div className='company-link'>
					<Link
						to={{
							pathname: '/privacy-policy',
						}}
					>
						<p className='footer-link' style={{ cursor: 'pointer', color: '#414753' }}>Privacy Policy</p>
					</Link>
					<a href="https://www.clutchcreativeco.com/" target='_blank' rel="noopener noreferrer" style={{ cursor: 'pointer', color: '#414753' }}>
						<p className='footer-link'>Website by Clutch Creative Company</p></a>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	path: state.placeReducer.path
});

export default connect(mapStateToProps, null)(withRouter(Home));
