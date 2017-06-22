const Account = require('../data/models').Account;

exports.create = function(req, res) {
return Account
	  .create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,  	
	  })
	  .then(account => res.status(201).send(account))
	  .catch(error => res.status(400).send(error));
};

exports.retrieve = function(req, res) {
	
		
		console.log(req.body);
		req.session.username = req.body.username;
		return Account.findAll({
			where: {
				username: req.body.username
			}
		})
		.then((account) => {
			let userdetails = JSON.stringify(account);
			userdetails = JSON.parse(userdetails);
			console.log(userdetails[0].password);
			if(bcrypt.compareSync(req.body.password, userdetails[0].password) === true) {
				req.session.name = req.body.username;
				req.session.id = userdetails[0].id;
				res.json({
					message: "Login successful"
				});
			}
			else {
				res.json(userdetails);
			}
		})
		.catch((error) => {
			console.log(error);
			res.json({
				message: "Invalid signin details"
			});
		});
	
}

