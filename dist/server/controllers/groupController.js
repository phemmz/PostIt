"use strict";

var Group = require('../data/models').Group;

exports.create = function (req, res) {
	console.log(req.body);
	console.log(req.session.user);
	if (req.session.user) {
		return Group.create({
			groupname: req.body.groupname
		}).catch(function (error) {
			console.log(error);
			res.json({
				message: "Cant save to database"
			});
		});
		res.json({
			message: "Group successfully created"
		});
	} else {
		res.json({
			message: "You need to login to create a group"
		});
	}
};