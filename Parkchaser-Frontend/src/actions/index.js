import * as constants from '../constants';

export function setPlaces(places) {
	return {
		type: constants.SET_PLACES,
		places
	};
}

//Sagas
export function getPlaces() {
	return {
		type: constants.GET_PLACES_SAGA
	};
}

//
export function setCurrentLocation(currentPos) {
	return {
		type: constants.SET_CURRENT_LOCATION,
		currentPos
	}
}

//Backend Action
export function updateDB() {
	return {
		type: constants.UPDATE_DB
	}
}
export function clearDB() {
	return {
		type: constants.CLEAR_DB
	}
}

export function getPlacesFromDB() {
	return {
		type: constants.GET_PLACES_FROM_DB
	}
}

//Set Path Name
export function setPathname(path) {
	return {
		type: constants.SET_PATH_NAMES,
		path
	}
}
//Send Email
export function sendEmail(data) {
	return {
		type: constants.SEND_EMAIL,
		data
	}
}



//Disable Mailchimp
export function diableMailchimp() {
	return {
		type: constants.DISABLE_MAILCHIMP
	}
}


//BLogs

export function getAllBlogs() {
	return {
		type: constants.GET_ALL_BLOGS
	}
}

export function getRecentBlogs() {
	return {
		type: constants.GET_RECENT_BLOGS
	}
}
export function setAllBlogs(blogs) {
	return {
		type: constants.SET_BLOGS,
		blogs
	};
}
export function setRecentBlogs(blogs) {
	return {
		type: constants.SET_RECENT_BLOGS,
		blogs
	};
}