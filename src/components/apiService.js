const config = require('config');

module.export = {
	get: function(url, callback) {
		fetch(config.baseUrl + url)
			.then(response => {
				if(response.ok)
					return response.json()
				else
					throw new Error('api: ' + url)
			})
			.then(data => {
				return callback(data);
			})
			.catch(err => {
				console.log('Error in -> ' + err.message)
			})
	}
}