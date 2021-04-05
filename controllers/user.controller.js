const request = require('request');
function getUsers(req, res) {
    let options = {
        method: 'GET',
        url: 'https://api.pipedrive.com/v1/persons?start=0&api_token=f26477cf727d281337bbf5f20f062f44d504a6a5'
    };

    request(options, async (error, response, body) => {
        if (error) {
            res.status(400).send({
                message: "Error",
                error: error
            })
        } else {
            const json = JSON.parse(body);
            res.send(json)
        }
    });
}

module.exports = {
    getUsers:getUsers
}