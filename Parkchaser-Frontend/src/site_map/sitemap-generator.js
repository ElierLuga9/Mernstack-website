require("babel-register")({
	presets: ["es2015", "react"]
});

const mongoose = require('mongoose');
const uri = "mongodb://andres:andres123@localhost:27017/skatedb";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
	console.log("Connection Succeeded");
});

const placeSchema = new mongoose.Schema({
	name: String,
	place_id: String
})
const placesDB = mongoose.model('places', placeSchema);

const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

const statename = [
	{
		"name": "Alabama",
		"abbreviation": "AL",
		"latitude": 32.7990,
		"longitude": -86.8073
	},
	{
		"name": "Alaska",
		"abbreviation": "AK",
		"latitude": 61.3850,
		"longitude": -152.2683
	},
	{
		"name": "Arizona",
		"abbreviation": "AZ",
		"latitude": 33.7712,
		"longitude": -111.3877
	},
	{
		"name": "Arkansas",
		"abbreviation": "AR",
		"latitude": 34.9513,
		"longitude": -92.3809
	},
	{
		"name": "California",
		"abbreviation": "CA",
		"latitude": 36.1700,
		"longitude": -119.7462
	},
	{
		"name": "Colorado",
		"abbreviation": "CO",
		"latitude": 39.0646,
		"longitude": -105.3272
	},
	{
		"name": "Connecticut",
		"abbreviation": "CT",
		"latitude": 41.5834,
		"longitude": -72.7622
	},
	{
		"name": "Delaware",
		"abbreviation": "DE",
		"latitude": 39.3498,
		"longitude": -75.5148
	},
	{
		"name": "District of Columbia",
		"abbreviation": "DC",
		"latitude": 38.8974,
		"longitude": -77.0268
	},
	{
		"name": "Florida",
		"abbreviation": "FL",
		"latitude": 27.8333,
		"longitude": -81.7170
	},
	{
		"name": "Georgia",
		"abbreviation": "GA",
		"latitude": 32.9866,
		"longitude": -83.6487
	},
	{
		"name": "Hawaii",
		"abbreviation": "HI",
		"latitude": 21.1098,
		"longitude": -157.5311
	},
	{
		"name": "Idaho",
		"abbreviation": "ID",
		"latitude": 44.2394,
		"longitude": -114.5103
	},
	{
		"name": "Illinois",
		"abbreviation": "IL",
		"latitude": 40.3363,
		"longitude": -89.0022
	},

	{
		"name": "Indiana",
		"abbreviation": "IN",
		"latitude": 39.8647,
		"longitude": -86.2604
	},
	{
		"name": "Iowa",
		"abbreviation": "IA",
		"latitude": 42.0046,
		"longitude": -93.2140
	},
	{
		"name": "Kansas",
		"abbreviation": "KS",
		"latitude": 38.5111,
		"longitude": -96.8005
	},
	{
		"name": "Kentucky",
		"abbreviation": "KY",
		"latitude": 37.6690,
		"longitude": -84.6514
	},
	{
		"name": "Louisiana",
		"abbreviation": "LA",
		"latitude": 31.1801,
		"longitude": -91.8749
	},
	{
		"name": "Maine",
		"abbreviation": "ME",
		"latitude": 44.6074,
		"longitude": -69.3977
	},
	{
		"name": "Maryland",
		"abbreviation": "MD",
		"latitude": 39.0724,
		"longitude": -76.7902
	},
	{
		"name": "Massachusetts",
		"abbreviation": "MA",
		"latitude": 42.2373,
		"longitude": -71.5314
	},
	{
		"name": "Michigan",
		"abbreviation": "MI",
		"latitude": 43.3504,
		"longitude": -84.5603
	},
	{
		"name": "Minnesota",
		"abbreviation": "MN",
		"latitude": 45.7326,
		"longitude": -93.9196
	},
	{
		"name": "Mississippi",
		"abbreviation": "MS",
		"latitude": 32.7673,
		"longitude": -89.6812
	},
	{
		"name": "Missouri",
		"abbreviation": "MO",
		"latitude": 38.4623,
		"longitude": -92.3020
	},
	{
		"name": "Montana",
		"abbreviation": "MT",
		"latitude": 46.9048,
		"longitude": -110.3261
	},
	{
		"name": "Nebraska",
		"abbreviation": "NE",
		"latitude": 41.1289,
		"longitude": -98.2883
	},
	{
		"name": "Nevada",
		"abbreviation": "NV",
		"latitude": 38.4199,
		"longitude": -117.1219
	},
	{
		"name": "New Hampshire",
		"abbreviation": "NH",
		"latitude": 43.4108,
		"longitude": -71.5653
	},
	{
		"name": "New Jersey",
		"abbreviation": "NJ",
		"latitude": 40.3140,
		"longitude": -74.5089
	},
	{
		"name": "New Mexico",
		"abbreviation": "NM",
		"latitude": 34.8375,
		"longitude": -106.2371
	},
	{
		"name": "New York",
		"abbreviation": "NY",
		"latitude": 42.1497,
		"longitude": -74.9384
	},
	{
		"name": "North Carolina",
		"abbreviation": "NC",
		"latitude": 35.6411,
		"longitude": -79.8431
	},
	{
		"name": "North Dakota",
		"abbreviation": "ND",
		"latitude": 47.5362,
		"longitude": -99.7930
	},
	{
		"name": "Ohio",
		"abbreviation": "OH",
		"latitude": 40.3736,
		"longitude": -82.7755
	},
	{
		"name": "Oklahoma",
		"abbreviation": "OK",
		"latitude": 35.5376,
		"longitude": -96.9247
	},
	{
		"name": "Oregon",
		"abbreviation": "OR",
		"latitude": 44.5672,
		"longitude": -122.1269
	},
	{
		"name": "Pennsylvania",
		"abbreviation": "PA",
		"latitude": 40.5773,
		"longitude": -77.2640
	},
	{
		"name": "Puerto Rico",
		"abbreviation": "PR",
		"latitude": 18.2491,
		"longitude": -66.628
	},
	{
		"name": "Rhode Island",
		"abbreviation": "RI",
		"latitude": 41.6772,
		"longitude": -71.5101
	},
	{
		"name": "South Carolina",
		"abbreviation": "SC",
		"latitude": 33.8191,
		"longitude": -80.9066
	},
	{
		"name": "South Dakota",
		"abbreviation": "SD",
		"latitude": 44.2853,
		"longitude": -99.4632
	},
	{
		"name": "Tennessee",
		"abbreviation": "TN",
		"latitude": 35.7449,
		"longitude": -86.7489
	},
	{
		"name": "Texas",
		"abbreviation": "TX",
		"latitude": 31.1060,
		"longitude": -97.6475
	},
	{
		"name": "Utah",
		"abbreviation": "UT",
		"latitude": 40.1135,
		"longitude": -111.8535
	},
	{
		"name": "Vermont",
		"abbreviation": "VT",
		"latitude": 44.0407,
		"longitude": -72.7093
	},
	{
		"name": "Virginia",
		"abbreviation": "VA",
		"latitude": 37.7680,
		"longitude": -78.2057
	},
	{
		"name": "Washington",
		"abbreviation": "WA",
		"latitude": 47.3917,
		"longitude": -121.5708
	},
	{
		"name": "West Virginia",
		"abbreviation": "WV",
		"latitude": 38.4680,
		"longitude": -80.9696
	},
	{
		"name": "Wisconsin",
		"abbreviation": "WI",
		"latitude": 44.2563,
		"longitude": -89.6385
	},
	{
		"name": "Wyoming",
		"abbreviation": "WY",
		"latitude": 42.7475,
		"longitude": -107.2085
	}
];


const topCity = [
	"Brooklyn",
	"Los Angeles",
	"Houston",
	"San Diego",
	"Chicago",
	"Seattle",
	"San Francisco",
	"New York",
	"Portland",
	"San Antonio",
	"Atlanta",
	"Minneapolis",
	"Albuquerque",
	"Tucson",
	"Las Vegas",
	"Sacramento",
	"Long Beach",
	"Philadelphia",
	"Orlando",
	"El Paso",
];
function generateSitemap() {
	var places;
	places = placesDB.find({},
		function (err, docs) {
			places = docs;

			let paramMap = [];

			//Filter Data
			var ret;
			var filtered = [];
			for (var i = 0; i < places.length; i++) {
				ret = false;
				//Location Filter
				var e = places[i];
				var address = '';
				if (e.address !== undefined)
					address = e.address;
				address = address.toLowerCase().replace(/\s/g, '');

				//Type Filter
				var name = e.name.toLowerCase().replace(/\s/g, '');

				if (name.indexOf('skat') >= 0 && name.indexOf('shop') < 0)
					ret = true;

				if (ret)
					filtered.push(e);
			}

			for (i = 0; i < filtered.length; i++) {
				paramMap.push({
					placeid: filtered[i].place_id,
					placename: filtered[i].name.replace(/\s/g, '-')
				});
			}
			//State List
			let stateParamMap = [];
			for (i = 0; i < statename.length; i++) {
				stateParamMap.push({
					stateid: statename[i].abbreviation,
					statename: statename[i].name.replace(/\s/g, '-') + '-Skateparks'
				});
			}
			//City List

			let cityParamMap = [];
			var cityName = topCity;
			for (i = 0; i < cityName.length; i++) {
				cityParamMap.push({
					cityname: cityName[i].replace(/\s/g, '-') + '-Skateparks'
				});
			}

			const paramsConfig = {
				"/states/:statename": stateParamMap,
				"/skateparks/:placename/:placeid": paramMap,
				"/cities/:cityname": cityParamMap
			};

			mongoose.disconnect();
			return (
				new Sitemap(router)
					.applyParams(paramsConfig)
					.build("https://www.parkchaser.com")
					.save("./public/sitemap.xml")
			);
		});


}

generateSitemap();

