import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	updateDB, clearDB
} from '../actions';


class Admin extends Component {

	constructor(props) {
		super(props);
		this.updateDB = this.updateDB.bind(this);
		this.clearDB = this.clearDB.bind(this);
	}

	updateDB() {

		this.props.updateDB();
	}
	clearDB() {
		//		this.props.clearDB();
	}

	render() {
		return (
			<div>
				<button onClick={this.updateDB}> Update DB</button>
				<button onClick={this.clearDB}> Clear DB</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({

	updateDB: () => dispatch(updateDB()),
	clearDB: () => dispatch(clearDB())
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
