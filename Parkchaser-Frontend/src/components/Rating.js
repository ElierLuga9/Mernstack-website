import React, { Component } from 'react';

import '../styles/rating.scss';

class Rating extends Component {
	render() {
		return (
			<div
				className="rating"
				data-rating={this.props.value}
			>
				<i className="star-1">★</i>
				<i className="star-2">★</i>
				<i className="star-3">★</i>
				<i className="star-4">★</i>
				<i className="star-5">★</i>
			</div>
		);
	}
}



export default Rating;
