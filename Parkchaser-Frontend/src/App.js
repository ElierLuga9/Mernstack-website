import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import ReactGA from 'react-ga';

import store, { history } from './store';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './screens/Home';
import detailPage from './screens/detailPage';
import adminPage from './screens/adminPage';

import statePage from './screens/statePage';
import stateList from './screens/stateList';

import contactPage from './screens/contactPage';
import thankyouPage from './screens/thanksPage';
import policy from './screens/policyPage';

import cityPage from './screens/cityPage';
import cityList from './screens/cityList';

import blogList from './screens/blogList';
import blogPage from './screens/blogPage';

import NotFoundPage from './screens/404';
import ScrollToTop from './ScrollToTop';

import './App.scss';

ReactGA.initialize('UA-147152218-1');

history.listen((location) => {
	//Google Analyse
	ReactGA.set({ page: location.pathname });
	ReactGA.pageview(location.pathname);
});

export default class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<Router history={history}  >
					<ScrollToTop>
						<div style={{ backgroundColor: 'RGB(240,244,252)' }} className='screen-container'>
							<Header />
							<div className='content'>
								<Switch>
									<Route exact path="/" component={Home} />
									<Route path="/skateparks/:placename/:placeid" component={detailPage} />

									<Route path="/adminpage" component={adminPage} />
									<Route path="/privacy-policy" component={policy} />
									<Route path="/contact" component={contactPage} />
									<Route path="/thankyou" component={thankyouPage} />

									<Route path="/cities/:cityname" component={cityPage} />
									<Route path="/states/:statename" component={statePage} />

									<Route path="/cities" component={cityList} />
									<Route path="/states" component={stateList} />

									<Route path="/blog/:blogtitle/:blogid" component={blogPage} />
									<Route path="/blog" component={blogList} />

									<Route path="*" component={NotFoundPage} />
								</Switch>
							</div>
							<Footer />
						</div>
					</ScrollToTop>
				</Router>
			</Provider>
		);
	}
}
