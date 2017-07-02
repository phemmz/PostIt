"use strict";

var _models = require("../data/models");

exports.retrieve = function (req, res) {

	console.log(req.body);
	req.session.username = req.body.username;
	return _models.Account.findAll({
		where: {
			username: req.body.username
		}
	}).then(function (account) {
		var userdetails = JSON.stringify(account);
		userdetails = JSON.parse(userdetails);
		console.log(userdetails[0].password);
		if (bcrypt.compareSync(req.body.password, userdetails[0].password) === true) {
			req.session.name = req.body.username;
			req.session.id = userdetails[0].id;
			return res.json({
				message: "Login successful"
			});
		} else {
			res.json(userdetails);
		}
	}).catch(function (error) {
		// console.log(error);
		res.json({
			message: "Invalid signin details"
		});
	});
};