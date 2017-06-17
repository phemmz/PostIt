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
	retrieve(req, res) {
		return Message
		  .findAll({ where: {groupId: req.params.groupId }  })
		  .then(msg => {
		  	if (msg===null) {
		  		return res.status(400).send({
		  			message: 'Message Not Found',
		  		});
		  	}
		  	return res.status(200).send(msg);
		  })
		  .catch(error => res.status(400).send(error));
	},		

}