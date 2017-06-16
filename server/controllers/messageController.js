const Message = require('../data/models').Message;

module.exports = {
	create(req, res) {
		return Message
		  .create({
		  	content: req.body.content,
		  	groupId: req.params.groupId,
		  })
		  .then(message => res.status(201).send(message))
		  .catch(error => res.status(400).send(error));
	},
}