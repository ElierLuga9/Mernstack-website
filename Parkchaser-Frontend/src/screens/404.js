import React, { Component } from 'react';

class NotFound extends Component {
	constructor(props) {
		super(props);

		this.gotoIndex = this.gotoIndex.bind(this);
	}

	gotoIndex() {
		this.props.history.push('/');
	}

	render() {

		return (
			<div className='centerDiv' style={{ textAlign: 'center' }}>
				<h1 style={{ fontSize: '40px', fontWeight: '900', marginTop: '200px' }}>We're sorry, this page must have moved.</h1>
				<p style={{ fontSize: '32px', marginTop: '20px' }}>No need to leave, go find a skatepark!</p>
				<button onClick={this.gotoIndex}
					className='mainbutton inputField' style={{ width: '300px', height: '58.37px', cursor: 'pointer', marginTop: '50px', marginBottom: '300px' }}>
					Find a Skatepark
			</button>
			</div >
		);
	}
}


export default NotFound;
