import React, { Component } from 'react';

class Thanks extends Component {

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
				<h1>Thank You!</h1>
				<h2>We'll be in contact soon. In the meantime, go find a skatepark!</h2>
				<button onClick={this.gotoIndex}
					className='mainbutton inputField' style={{ width: '300px', height: '58.37px', cursor: 'pointer' }}>

					FIND A SKATEPARK
				</button>
			</div >
		);
	}
}



export default Thanks;
