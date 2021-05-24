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

//comparar campos
function login(req, res) {
  console.log(req.params.email)
console.log(req.params.pass)
var passReq = req.params.pass
console.log(passReq)
  let options = {
    //const id =
    method: "GET",
    url:
      "https://api.pipedrive.com/v1/persons/search?term=" + req.params.email + "&fields=email&start=0&api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
  };
  request(options, async (error, response, body) => {
    if (error) {
      res.status(400).send({
        message: "Error",
        error: error,
      });
    } else {
      const json = JSON.parse(body);
      console.log(json.data.items)
      const a = json.data.items
        for (i = 0; i < a.length; i++) {
            console.log(a[i].item.custom_fields)
            const cf = a[i].item.custom_fields
            var pass = cf[0]
            
        }
        console.log("pass no back: "+pass+" ---------- "+passReq)
        console.log(bcrypt.compareSync(passReq, pass))
        if(bcrypt.compareSync(passReq, pass)){
          res.send(true)
        } else {
          res.send(false)
        }
     
    }
  });
}



function getUserByEmail(req, res) {
  let options = {
    //const id =
    method: "GET",
    url:
      "https://api.pipedrive.com/v1/persons/search?term=" + req.params.term + "&fields=email&start=0&api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
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
  //console.log(user);

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
  user[atributes.nif] = req.body.nif;
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
  user[atributes.nif] = req.body.nif;
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
  user[atributes.nif] = req.body.nif
  user[atributes.cargo] = req.body.cargo
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

///ESTABELECIMENTOS
function getPlaces(req, res) {
  let options = {
    method: "GET",
    url:
      "https://api.pipedrive.com/v1/products?start=0&api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
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

function addPlace(req, res) {
  let user = {};
  user["name"] = req.body.name;
  user[atributes.latitude] = req.body.latitude;
  user[atributes.longitude] = req.body.longitude;
  user[atributes.tipo] = req.body.tipo;
  console.log(user);

  let options = {
    method: "POST",
    url:
      "https://api.pipedrive.com/v1/products?api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
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

function updatePlace(req, res) {
  let place = {};
  place["name"] = req.body.name;
  place[atributes.latitude] = req.body.latitude;
  place[atributes.longitude] = req.body.longitude;
  place[atributes.tipo] = req.body.tipo;
  //comparar password
  //bcrypt.compareSync(passwordInserida, passwordPipedrive)
  console.log(req.params.id)
  let options = {
    method: "PUT",
    url:
      "https://api.pipedrive.com/v1/products/" + req.params.id + "?api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
    form: place,
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


function deletePlace(req, res) {
  let options = {
    //const id =
    method: "DELETE",
    url:
      "https://api.pipedrive.com/v1/products/" + req.params.id + "?api_token=f26477cf727d281337bbf5f20f062f44d504a6a5",
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
  addMaterialManager: addMaterialManager,
  addTicketManager: addTicketManager,
  updateData: updateData,
  deleteUser: deleteUser,
  getUserByEmail: getUserByEmail,
  getPlaces: getPlaces,
  addPlace: addPlace,
  deletePlace: deletePlace,
  login:login,
  updatePlace:updatePlace
};
