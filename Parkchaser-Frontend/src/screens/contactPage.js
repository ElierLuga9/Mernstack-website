import React, { Component } from 'react';
import { connect } from 'react-redux';

import MetaTags from 'react-meta-tags';

import validator from 'validator';
import MailchimpSubscribe from "react-mailchimp-subscribe";

import { setPathname, sendEmail } from '../actions';

import '../styles/Contact.css';


const mailChimpURL =
	"https://parkchaser.us4.list-manage.com/subscribe/post?u=66408fdca85c349340fc31640&amp;id=086d07347a";

class MailChimpForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name2: '',
			name2Valid: true,
			email2: '',
			email2Valid: true
		}

		this.signUp = this.signUp.bind(this);
	}

	signUp() {
		var namevalid = true;
		if (this.state.name2 === '')
			namevalid = false;

		this.setState({
			name2Valid: namevalid,
			email2Valid: validator.isEmail(this.state.email2)
		})
		if (validator.isEmail(this.state.email2) && namevalid) {
			this.props.subscribe({ EMAIL: this.state.email2, FNAME: this.state.name2 });
			this.setState({
				name2: '',
				name2Valid: true,
				email2: '',
				email2Valid: true
			})
		}
	}

	render() {
		var status = this.props.status;
		var message = this.props.message;
		return (
			<div className='form' >
				<h2 >EMAIL SIGN-UP</h2>
				<p className=' inputField'>
					Stay up to date with new skatepark openings, old favorites and everything going on around here.
			</p>
				<div className='inputField'>
					<p>First Name *</p>
					<input className={this.state.name2Valid ? 'contactInput' : 'error-input'} value={this.state.name2} onChange={(e) => { this.setState({ name2: e.target.value, name2Valid: true }) }} />
				</div>
				<div className='inputField'>
					<p>Email Address</p>
					<input className={this.state.email2Valid ? 'contactInput' : 'error-input'} value={this.state.email2} onChange={(e) => { this.setState({ email2: e.target.value, email2Valid: validator.isEmail(this.state.email2) }) }} />
				</div>
				<button onClick={this.signUp} className='mainbutton inputField' style={{ width: '100%', height: '58.37px', cursor: 'pointer' }}>
					SEND IT
				</button>
				<div>
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

class ContactFrom extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			nameValid: true,
			email1: '',
			email1Valid: true,
			phone: '',
			phoneValid: true,
			message: '',
			messageValid: true,
			newsletter: true,

		}


		this.sendEmail = this.sendEmail.bind(this);
	}

	sendEmail() {
		var validOptions = [true, true, true, true];

		if (this.state.name === '')
			validOptions[0] = false;

		validOptions[1] = validator.isEmail(this.state.email1);
		validOptions[2] = validator.isMobilePhone(this.state.phone);
		if (this.state.phone === '') {
			validOptions[2] = true;
		}
		if (this.state.message === '')
			validOptions[3] = false;

		this.setState({
			nameValid: validOptions[0],
			email1Valid: validOptions[1],
			phoneValid: validOptions[2],
			messageValid: validOptions[3]
		})
		//Send Data
		var data = {
			senderEmail: this.state.email1,
			senderName: this.state.name,
			senderPhone: this.state.phone,
			message: this.state.message,
			newsletter: this.state.newsletter
		}
		if (validOptions[0] && validOptions[1] && validOptions[2] && validOptions[3]) {

			if (this.state.newsletter) {
				this.props.subscribe({ EMAIL: this.state.email1, FNAME: this.state.name });
				this.props.sendEmail(data);
			}
			else {
				this.props.sendEmail(data);
				this.props.history.push('/thankyou');
			}



		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.state.newsletter && nextProps.status === 'success')
			this.props.history.push('/thankyou');
	}

	render() {
		var status = this.props.status;
		var message = this.props.message;

		return (

			<div className='form'>
				<h2>CONTACT PARKCHASER</h2>
				<p className=' inputField' >
					We 're dedicated to building the best skatepark map around. Drop us a line if you have any questions, comments or inquiries.
						</p>
				<div className='inputField'>
					<p>First Name *</p>

					<input className={this.state.nameValid ? 'contactInput' : 'error-input'} value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value, nameValid: true }) }} />
				</div>
				<div className='inputField'>
					<p>Email Address *</p>
					<input className={this.state.email1Valid ? 'contactInput' : 'error-input'} value={this.state.email1} onChange={(e) => { this.setState({ email1: e.target.value, email1Valid: validator.isEmail(this.state.email1) }) }} />
				</div>
				<div className='inputField'>
					<p >Phone Number</p>
					<input className={this.state.phoneValid ? 'contactInput' : 'error-input'} value={this.state.phone} onChange={(e) => { this.setState({ phone: e.target.value, phoneValid: validator.isMobilePhone(this.state.phone) }) }} />
				</div>
				<div className='inputField'>
					<p >Message *</p>
					<textarea className={this.state.messageValid ? 'contactInput' : 'error-input'} style={{ height: '256px', padding: '10px' }}
						value={this.state.message} onChange={(e) => { this.setState({ message: e.target.value, messageValid: true }) }}
					/>
				</div>
				<div className='inputField' style={{ display: 'flex', alignItems: 'center' }}>
					<input type='checkbox' checked={this.state.newsletter} onChange={() => { this.setState({ newsletter: !this.state.newsletter }) }} />
					<p style={{ marginLeft: '10px' }}>Receive our Newsletter</p>
				</div>
				<div>
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
				<div id='newsletter' />
				<button onClick={this.sendEmail}
					className='mainbutton inputField' style={{ width: '100%', height: '58.37px', cursor: 'pointer' }}>
					SEND IT
				</button>
				<div className='inputField'>
					<p style={{ color: '#BE3118' }}>* Required</p>
				</div>
			</div>

		);
	}
}
class Detail extends Component {

	constructor(props) {
		super(props);

		var history = this.props.history;
		history.listen((location) => {
			this.props.setPathname(location.pathname);
		});

	}

	componentDidMount() {
		this.props.setPathname('/contact');
	}

	render() {

		return (
			<div className='centerDiv'>
				<MetaTags>
					<title>Contact Parkchaser - The Most Accurate US Skatepark Map</title>
					<meta name="description" content="Parkchaser is US skatepark map & skatepark directory allowing skaters to find parks near them and around the country. Find a skatepark and go check it out." />
				</MetaTags>
				<div className='contact-container'>
					<MailchimpSubscribe
						url={mailChimpURL}
						render={({ subscribe, status, message }) => (
							<ContactFrom history={this.props.history} sendEmail={this.props.sendEmail}
								status={status} message={message} subscribe={subscribe} />
						)}
					/>
					<MailchimpSubscribe
						url={mailChimpURL}
						render={({ subscribe, status, message }) => (
							<MailChimpForm status={status} message={message} subscribe={subscribe} />
						)}
					/>
				</div>
			</div >
		);
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	setPathname: (path) => dispatch(setPathname(path)),
	sendEmail: (data) => dispatch(sendEmail(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
