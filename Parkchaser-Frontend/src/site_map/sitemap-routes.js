import React from "react";
import { Switch, Route } from "react-router";

export default (
	<Switch>
		<Route exact path="/" />
		<Route path="/skateparks/:placename/:placeid" />
		<Route path="/states/:statename" />
		<Route path="/cities/:cityname" />
		<Route path="/contact" />
		<Route path="/thankyou" />
		<Route path="/privacy-policy" />
		<Route path="/cities" />
		<Route path="/states" />
	</Switch>
);