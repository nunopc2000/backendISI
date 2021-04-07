const request = require("request");
const atributes = require("./pipeAtributes.json")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
//GETS
function getUsers(req, res) {
  let options = {
    method: "GET",
    url:
      "https://api.pipedrive.com/v1/persons?start=0&api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
  };

  request(options, async (error, response, body) => {
    if (error) {
      res.status(400).send({
        message: "Error",
        error: error,
      });
    } else {
      const json = JSON.parse(body);
      res.send(json);
    }
  });
}

function getUserByID(req, res) {
  let options = {
    //const id =
    method: "GET",
    url:
      "https://api.pipedrive.com/v1/persons/" + req.params.id + "?api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
  };

  request(options, async (error, response, body) => {
    if (error) {
      res.status(400).send({
        message: "Error",
        error: error,
      });
    } else {
      const json = JSON.parse(body);
      //console.log(bcrypt.compareSync("nuno", json.data[atributes.password]))
      res.send(json);
    }
  });
}

//POSTS
function addUser(req, res) {
  let user = {};
const password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10),
    null
);
  user["name"] = req.body.name;
  user["email"] = req.body.email;
  user["phone"] = req.body.phone;
  user[atributes.password] = password;
  //comparar password
  //bcrypt.compareSync(passwordInserida, passwordPipedrive)
  console.log(user);

  let options = {
    method: "POST",
    url:
      "https://api.pipedrive.com/v1/persons?api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
    form: user,
  };

  request.post(options, async (error, response, body) => {
    if (error) {
      res.status(400).send({
        message: "Error",
        error: error,
      });
    } else {
      if (response.statusCode == 201) {
        res.send("success");
      } else {
        res.send("Error");
        /*console.log(body)
        console.log(response.statusCode)*/
      }
    }
  });
}

//DELETES
function deleteUser(req, res) {
  let options = {
    //const id =
    method: "DELETE",
    url:
      "https://api.pipedrive.com/v1/persons/" + req.params.id + "?api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
  };

  request(options, async (error, response, body) => {
    if (error) {
      res.status(400).send({
        message: "Error",
        error: error,
      });
    } else {
      const json = JSON.parse(body);
      res.send(json);
    }
  });
}

module.exports = {
  getUsers: getUsers,
  getUserByID: getUserByID,
  addUser: addUser,
  deleteUser: deleteUser,
};
