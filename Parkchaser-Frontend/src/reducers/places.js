import { SET_PLACES, SET_CURRENT_LOCATION, SET_PATH_NAMES, DISABLE_MAILCHIMP } from '../constants';
import { statename } from '../lib/statename';

const initialState = { places: [], topCity: [], topCityData: [], currentPos: { lat: 0, lng: 0 }, path: '/', mailchimp: true };


function getCityName(address) {
	var temp = address;
	var lastComma = temp.lastIndexOf(',');
	temp = temp.slice(0, lastComma);
	lastComma = temp.lastIndexOf(',');
	temp = temp.slice(0, lastComma);
	lastComma = temp.lastIndexOf(',');
	temp = temp.slice(lastComma + 1);
	return temp;
}

function stateIndex(name) {
	var index = -1;
	var temp = name;
	if (temp.indexOf('Puerto Rico') !== -1)
		index = 39;
	else {
		var length = temp.lastIndexOf(',');
		temp = temp.substring(length - 8, length - 6);
		index = statename.findIndex(obj => obj.abbreviation === temp);

	}
	if (index === -1) {
		//	console.log('Can not find' + name);
	}
	return index;
}

export default function setBrowserInfo(state = initialState, action) {
	switch (action.type) {

		case SET_PLACES:

			var data = action.places;
			//Filter Data by Keywords
			var ret;
			var filtered = data.filter((e) => {
				ret = false;
				//Location Filter
				var address = e.address.toLowerCase().replace(/\s/g, '');
				if (address.indexOf('usa') === -1 && address.indexOf('unitedstates') === -1 && address.indexOf('puertorico') === -1)
					return false;
				//Type Filter
				var name = e.name.toLowerCase().replace(/\s/g, '');

				if (name.indexOf('skat') >= 0 && name.indexOf('shop') < 0)
					ret = true;
				if (name.indexOf('rink') >= 0)
					ret = false;
				if (name.indexOf('center') >= 0)
					ret = false;
				return ret;
			});

			//Get Top City List
			var places = filtered;

			var topCity = [];
			for (var i = 0; i < places.length; i++) {
				var cityName = getCityName(places[i].address).trim();

				var cityID = cityName.replace(/\s/g, '');
				var stateindex = stateIndex(places[i].address)
				cityID = cityID + stateindex;

				var index = topCity.findIndex(function (item, i) {
					return item.cityID === cityID
				});
				if (index === -1)
					topCity.push({
						cityID: cityID,
						cityName: cityName,
						state: statename[stateindex],
						count: 1
					});
				else
					topCity[index].count++;
			}

			topCity.sort(function (a, b) {
				return b.count - a.count;
			});

			topCity = topCity.slice(0, 20);


			return {
				...state,
				places: filtered,
				topCity: topCity
			};
		case SET_CURRENT_LOCATION:
			return {
				...state,
				currentPos: action.currentPos
			}
		case SET_PATH_NAMES:
			return {
				...state,
				path: action.path
			}
		case DISABLE_MAILCHIMP:
			return {
				...state,
				mailchimp: false
			}

		default:
			return state;
	}
}
