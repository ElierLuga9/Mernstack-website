import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from "react-router";
import '../styles/Header.css';

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			mobileMenu: false
		}

		this.navigateToContact = this.navigateToContact.bind(this);
		this.navigateToDashboard = this.navigateToDashboard.bind(this);
		this.navigateToStateList = this.navigateToStateList.bind(this);
		this.navigateToCityList = this.navigateToCityList.bind(this);
		this.navigateToBlogs = this.navigateToBlogs.bind(this);

		this.openMobileMenu = this.openMobileMenu.bind(this);
	}

	openMobileMenu() {
		this.setState({
			mobileMenu: !this.state.mobileMenu
		})
	}

	navigateToContact() {
		this.props.history.push('/contact');
	}
	navigateToDashboard() {
		this.props.history.push('/');
	}
	navigateToStateList() {
		this.props.history.push('/states');
	}
	navigateToCityList() {
		this.props.history.push('/cities');
	}
	navigateToBlogs() {
		this.props.history.push('/blog');
	}

	mobileMenuAction(mode) {
		this.openMobileMenu();
		switch (mode) {
			case 1:
				this.navigateToDashboard();
				break;
			case 2:
				this.navigateToStateList();
				break;
			case 3:
				this.navigateToCityList();
				break;
			case 4:
				this.navigateToContact();
				break;
			case 5:
				this.navigateToBlogs();
				break;
			default:
				break;
		}
	}
	render() {
		var path = this.props.path;
		return (
			<header className="header-fixed">

				<div className="header-limiter">
					<div onClick={this.navigateToDashboard}
						style={{ cursor: 'pointer' }}>
						<img src='/PNG/2X/Parkchaser-Skateboard-Map@2X.png' alt='' />
					</div>
					<div style={{ display: 'flex' }} className='desktop-menu'>
						<p onClick={this.navigateToDashboard}
							className='contact-button'
							style={path === '/' ? { color: '#09A7E2' } : { color: 'white' }}
						>HOME</p>
						<p onClick={this.navigateToStateList}
							className='contact-button'
							style={path === '/states' ? { color: '#09A7E2' } : { color: 'white' }}
						>SKATEPARKS BY STATE</p>
						<p onClick={this.navigateToCityList}
							className='contact-button'
							style={path === '/cities' ? { color: '#09A7E2' } : { color: 'white' }}
						>SKATEPARKS BY CITY</p>
						<p onClick={this.navigateToBlogs}
							className='contact-button'
							style={path === '/blog' ? { color: '#09A7E2' } : { color: 'white' }}
						>BLOG</p>
						<p onClick={this.navigateToContact}
							className='contact-button'
							style={path === '/contact' ? { color: '#09A7E2' } : { color: 'white' }}
						>CONTACT US</p>
					</div>
					<div className='mobile-menu'>
						<div onClick={this.openMobileMenu}
							className='contact-button'
							style={this.state.mobileMenu ? { color: '#09A7E2', fontSize: '40px', fontFamily: 'Roboto', transform: 'rotate(45deg)' } :
								{ color: '#09A7E2', fontSize: '40px', fontFamily: 'Roboto' }}
						> +</div>
					</div>
					<div className={!this.state.mobileMenu ? 'menu mobile-menu-panel' : 'menu mobile-menu-panel-open'} >
						<p onClick={() => this.mobileMenuAction(1)}
							className='mobile-menu-button'
							style={path === '/' ? { color: '#09A7E2' } : { color: 'white' }}
						>HOME</p>
						<p onClick={() => this.mobileMenuAction(2)}
							className='mobile-menu-button'
							style={path === '/states' ? { color: '#09A7E2' } : { color: 'white' }}
						>SKATEPARKS BY STATE</p>
						<p onClick={() => this.mobileMenuAction(3)}
							className='mobile-menu-button'
							style={path === '/cities' ? { color: '#09A7E2' } : { color: 'white' }}
						>SKATEPARKS BY CITY</p>
						<p onClick={() => this.mobileMenuAction(5)}
							className='mobile-menu-button'
							style={path === '/blog' ? { color: '#09A7E2' } : { color: 'white' }}
						>BLOG</p>
						<p onClick={() => this.mobileMenuAction(4)}
							className='mobile-menu-button'
							style={path === '/contact' ? { color: '#09A7E2' } : { color: 'white' }}
						>CONTACT US</p>
					</div>

				</div>

			</header>
		);
	}
}

const mapStateToProps = state => ({
	path: state.placeReducer.path
});

export default connect(mapStateToProps, null)(withRouter(Home));
