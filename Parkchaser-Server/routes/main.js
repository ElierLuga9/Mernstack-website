var express = require("express");
const jwt = require("jsonwebtoken");
var atob = require("atob");
var router = express.Router();

const nodemailer = require('nodemailer');

var placeSchema = require('../models/mainModel');
var blogSchema = require('../models/blogModel');
var userSchema = require('../models/userModel');

const fetch = require('node-fetch');
var zipcode = require('../models/zipcode.json');

async function getPlaces(lat, lng) {
	var returndata = [], data;
	await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?location=' + lat + ',' + lng + '&query=skate+park&key=AIzaSyCIW48wqv3oz7ZgL8Q8vSQUwJ3xfQjjeEM').then(res =>
		res.json()
	).then(body => {
		data = body.results;
	})
	for (var i = 0; i < data.length; i++) {
		var photo = {};


		if (data[i].photos !== undefined) {
			photo = data[i].photos[0];

			var photo = {
				height: photo.height,
				width: photo.width,
				photo_reference: photo.photo_reference
			};
		}
		var temp = {
			geometry: data[i].geometry.location,
			place_id: data[i].place_id,
			name: data[i].name,
			photo: photo,
			rating: data[i].rating,
			address: data[i].formatted_address
		};
		returndata.push(temp);
	}
	return returndata;
}

router.get("/fetchSkates", function (req, res, next) {
	placeSchema.find({},
		function (err, docs) {
			res.json(docs);
		})
});

router.get("/updateDB", async function (req, res, next) {
	console.log('UPDATE DATABASE!');
	var cnt = 0;
	for (var i = 33098; i < zipcode.length; i++) {

		var data = await getPlaces(zipcode[i].lat, zipcode[i].lng);

		for (var j = 0; j < data.length; j++) {
			let place = new placeSchema({
				lat: data[j].geometry.lat,
				lng: data[j].geometry.lng,
				place_id: data[j].place_id,
				name: data[j].name,
				rating: data[j].rating,
				state: zipcode[i].state_id,
				address: data[j].address,
				photo: {
					width: data[j].photo.width,
					height: data[j].photo.height,
					photo_reference: data[j].photo.photo_reference
				}
			});

			place.save().then(
				() => {
					cnt++;
				}
			).catch(
				(err) => {
				});

		}
		console.log('FETCH :', i, ' + ', cnt);
	}
	/*
*/
});
router.get("/clearDB", async function (req, res, next) {
	console.log('DELETE ALL PLACE COLLECTION!');
	placeSchema.deleteMany({}, function (err, removed) {
	});
});



router.post("/sendEmail", function (req, res, next) {
	console.log('SEND EMAIL FOR NEWSLETTER!');
	let transport = nodemailer.createTransport({
		host: "smtp.dreamhost.com", // hostname
		secureConnection: false, // TLS requires secureConnection to be false
		port: 587, // port for secure SMTP
		auth: {
			user: 'mail@parkchaser.com',
			pass: "m7wXuM!a"
		},
		tls: {
			ciphers: 'SSLv3'
		}
	});

	var newsletter = '';
	if (req.body.newsletter)
		newsletter = req.body.name + ' wants to get newsletters.';
	else
		newsletter = req.body.name + ' does not want to get newsletters.';
	const message = {
		from: 'mail@parkchaser.com', // Sender address
		subject: '"' + req.body.name + '" ' + req.body.from, // Subject line
		html: '<h3>Phone Number:' + req.body.phone + '</h3><h3>' + req.body.message + '</h3><h3>' + newsletter + '</h3>'
		// Plain text body
	};
	message.to = 'lucasnaheulgonz@gmail.com';         // List of recipients
	transport.sendMail(message, function (err, info) {
		if (err) {
			res.send(err)
		} else {
			res.send(info);
		}
	});
});

router.get("/getAllBlogs", function (req, res, next) {
	blogSchema.find({},
		function (err, docs) {
			res.json(docs);
		})
});




router.get("/getRecentBlogs", function (req, res, next) {
	blogSchema.find({}).sort({ "dateCreated": -1 })
		.limit(5)
		.then(docs => {
			res.json(docs);
		});
});

router.post("/getBlog", function (req, res, next) {
	const blogId = req.body.blogId;
	blogSchema.findById(blogId, function (err, doc) {
		res.send(doc);
	});
});

router.post("/updateBlog", function (req, res, next) {
	const blogData = req.body;
	blogSchema.findOneAndUpdate(
		{ "_id": blogData._id },
		{ $set: blogData },
		{ returnOriginal: false },
		function (err, documents) {
			res.send({ error: err, affected: documents });
		}
	);
});

router.post("/insertBlog", function (req, res, next) {
	const blogData = req.body;
	let blog = new blogSchema(blogData);

	blog.save().then(
		() => {
			res.send(blog._id);
		}
	).catch(
		(err) => {
		});
});

router.post("/deleteBlog", function (req, res, next) {
	const blogId = req.body.blogId;
	blogSchema.findOneAndRemove(blogId, function (err, doc) {
		res.send(true);
	});
});

router.post("/authenticate", function (req, res, next) {
	const pwd = atob(req.body.token);
	userSchema.findOne({ "username": "admin" }, function (err, doc) {
		if (doc.password === pwd)
			res.send(true);
		else
			res.send(false);
	});
});

module.exports = router;


