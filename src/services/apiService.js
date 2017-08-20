const config = require('config');
/*
    Will be used to handle api integration
*/
module.exports = {
    post: function(url, data, callback) {
        fetch(config.baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
        .then(response => {
            if(response.ok)
                return response.json()
            else
                throw new Error('api: ' + url)
        })
        .then(data => {
            return callback(data)
        })
        .catch(err => {
            console.log('Error in -> ' + err.message)
        })
    },
    delete: function(url, callback) {
        fetch(config.baseUrl + url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
        .then(response => {
            if(response.ok)
                return response.json()
            else
                throw new Error('api: ' + url)
        })
        .then(data => {
            return callback(data)
        })
        .catch(err => {
            console.log('Error in -> ' + err.message)
        })
    },
    get: function(url, callback) {
        fetch(config.baseUrl + url)
        .then(response => {
            if(response.ok)
                return response.json()
            else
                throw new Error('api: ' + url)
        })
        .then(data => {
            return callback(data)
        })
        .catch(err => {
            console.log('Error in -> ' + err.message)
        })
    }
}