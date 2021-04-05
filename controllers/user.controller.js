const request = require('request');
//GETS
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

function getUserByID(req, res) {
    let options = {
        //const id =
        method: 'GET',
        url: 'https://api.pipedrive.com/v1/persons/{id}?api_token=f26477cf727d281337bbf5f20f062f44d504a6a5'
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

//POSTS
function addUser(req, res) {
    let user = {};
        user['name'] = req.body.name;
        user['email'] = req.body.email;
        user['password'] = req.body.password;    
    
    let options = {
        method: 'POST',
        url: 'https://api.pipedrive.com/v1/persons?api_token=f26477cf727d281337bbf5f20f062f44d504a6a5',
        data: user
    };

    request.post(options, async (error, response, body) => {
        if (error) {
            res.status(400).send({
                message: "Error",
                error: error
            })
        } else {
            res.send("success");
        }
    });
}

//DELETES
function deleteUser(req, res) {
    let options = {
        //const id =
        method: 'DELETE',
        url: 'https://api.pipedrive.com/v1/persons/{id}?api_token=f26477cf727d281337bbf5f20f062f44d504a6a5'
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
    getUsers:getUsers,
    getUserByID:getUserByID,
    addUser:addUser,
    deleteUser:deleteUser,
}