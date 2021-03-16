import React, { Component } from 'react';
import { connect } from 'react-redux';

import validator from 'validator';
import MailchimpSubscribe from "react-mailchimp-subscribe";

import { sendEmail } from '../actions';

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
	componentWillReceiveProps(nextProp) {
		if (nextProp.status === "success") {
			this.props.close();
		}
	}
	render() {
		var status = this.props.status;
		var message = this.props.message;

		return (
			<div style={{ padding: '5px' }}>
				<div style={{ marginBottom: '20px' }}>
					<h2 >Get our Newsletter</h2>
					<p>Stay up to date with new skatepark openings, old favorites and everything going on around here.</p>
				</div>
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

class Detail extends Component {




	render() {

		return (
			<div style={{ textAlign: 'center', padding: '30px' }}>

				<MailchimpSubscribe
					url={mailChimpURL}
					render={({ subscribe, status, message }) => (
						<MailChimpForm status={status} message={message} subscribe={subscribe} close={this.props.close} />
					)}
				/>
				<p onClick={this.props.close} className='textClickable'>No Thanks</p>
			</div>
		);
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	sendEmail: (data) => dispatch(sendEmail(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
