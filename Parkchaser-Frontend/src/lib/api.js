import axios from 'axios';

import { GOOGLE_KEY } from './apikey';

const BACKEND_URL = 'https://backend.parkchaser.com';
//const BACKEND_URL = 'http://192.168.1.62:8000';
export async function getUsers() {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	return response.json();
}

export async function getPlaces() {
	var data;
	await axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=skate+park&key=' + GOOGLE_KEY)
		.then(res => {
			data = res.data.results;
		});
	return data;
}

export async function GetPlaceData(placeId) {
	var data;
	try {
		const res = await axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeId + '&key=' + GOOGLE_KEY)
		data = res.data.result;
	} catch (e) {

	}
	return data;
}
export function getCurrentLocation() {
	return new Promise((resolve, reject) => {


		//	var options = { maximumAge: 50000, timeout: 20000, enableHighAccuracy: false }
		var pos = { lat: 0, lng: 0 };

		resolve(pos);
		/*
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function success(position) {
					pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
					resolve(pos);
					console.log(pos);
				},
				function (error) {
					console.log(
						"Unable to get current location at the moment."
					);
				},
				options
			);
	} else {
		reject("Unable to get Current Location at the moment");
	}*/
	})
}
export async function getAPICurrentLocation() {
	var data;
	try {
		const res = await axios.get('https://www.googleapis.com/geolocation/v1/geolocate?key=' + GOOGLE_KEY)
		data = res.location;
		console.log(data)
	} catch (e) {

	}
	return data;
};
export function updatePlaceDB() {
	return fetch(BACKEND_URL + '/main/updateDB', {
		method: 'GET',
	}).then(response => {
		console.log(response)
	})
}

export function clearPlaceDB() {
	return fetch(BACKEND_URL + '/main/clearDB', {
		method: 'GET',
	}).then(response => {
		console.log(response)
	})

}

export function getPlacesFromDb() {
	return fetch(BACKEND_URL + '/main/fetchSkates', {
		method: 'GET',
	}).then(response => {
		return response.json();
	})
}

export function sendEmail(data) {
	return fetch(BACKEND_URL + '/main/sendEmail', {
		method: 'POST',
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			from: data.senderEmail,
			name: data.senderName,
			phone: data.senderPhone,
			message: data.message,
			newsletter: data.newsletter
		})
	}).then(response => {
		return response.json();
	})
}


export function getAllBlogs() {
	return fetch(BACKEND_URL + '/main/getAllBlogs', {
		method: 'GET',
	}).then(response => {
		return response.json();
	})
}
export function getRecentBlogs() {
	return fetch(BACKEND_URL + '/main/getRecentBlogs', {
		method: 'GET',
	}).then(response => {
		return response.json();
	})
}

export function getBlog(blogId) {
	return fetch(BACKEND_URL + '/main/getBlog', {
		method: 'POST',
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			blogId
		})
	}).then(response => {
		return response.json();
	})
}