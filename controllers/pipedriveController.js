const request = require("request");
const atributes = require("./pipeAtributes.json")
const bcrypt = require('bcrypt');
//dartbranch
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
/*
function getByTerm(req, res) {
  let options = {
    //const id =
    method: "GET",
    url:
      "https://api.pipedrive.com/v1/persons/search/?term=" + req.params.term + "&fields=name&start=0&api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
  };

  request(options, async (error, response, body) => {
    console.log(req.params.id);
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
*/
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
  user[atributes.nif] = req.body.nif;
  user[atributes.password] = password;
  user[atributes.cargo] = "Cliente";
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

function addMaterialManager(req, res) {
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
  user[atributes.cargo] = "Gestor de Materiais";
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

function addTicketManager(req, res) {
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
  user[atributes.cargo] = "Gestor de Bilhetes";
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

//PUTs
function updateData(req, res) {
  let user = {};

  user["name"] = req.body.name;
  user["email"] = req.body.email;
  user["phone"] = req.body.phone;
  //comparar password
  //bcrypt.compareSync(passwordInserida, passwordPipedrive)
  console.log(user);
  console.log(req.params.id)
  let options = {
    method: "PUT",
    url:
      "https://api.pipedrive.com/v1/persons/" + req.params.id + "?api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
    form: user,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
  }
  };

  request.put(options, async (error, response, body) => {
    if (error) {
      res.status(400).send({
        message: "Error",
        error: error,
      });
    } else {
      console.log(body)
      if (response.statusCode == 200) {
        res.send("success");
      } else {
        res.send("Error");
        /*console.log(body)
        console.log(response.statusCode)*/
      }
    }
  });
}

//DELETEs
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
  //getByTerm:getByTerm,
  getUserByID: getUserByID,
  addUser: addUser,
  addMaterialManager: addMaterialManager,
  addTicketManager: addTicketManager,
  updateData: updateData,
  deleteUser: deleteUser,
};
