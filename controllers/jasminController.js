const request = require("request");

function login(cb) {
  request(
    {
      url: "https://identity.primaverabss.com/core/connect/token",
      method: "POST",
      auth: {
        user: "EASYFESTIVAL",
        pass: "f5305f5b-abe3-45dd-ba6e-29d334a7ce4c",
      },
      form: {
        grant_type: "client_credentials",
        scope: "application",
      },
    },
    function (err, res) {
      if (res) {
        const json = JSON.parse(res.body);
        cb(json.access_token);
      } else {
        console.log("Could not obtain acess token.");
        cb(false);
      }
    }
  );
}

function getMaterials(req, res) {
  login(function (token) {
    if (token) {
        let options = {
            method: 'GET',
            url: "https://my.jasminsoftware.com/api/252175/252175-0001/materialscore/materialsitems",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        request(options, function (error, response, body) {
            console.log(response.statusCode)
            res.send(JSON.parse(body));
        })
    } else {
      res.send("erro");
    }
  });
}

function addMaterial(req, res) {
    login(function (token) {
      if (token) {
        let material = {};
        material["name"] = req.body.itemKey;
        material["armazem"] = req.body.defaultWarehouse;
        material["tipo"] = req.body.itemType;
        console.log(material);
          
          let options = {
              method: 'POST',
              url: "https://my.jasminsoftware.com/api/252175/252175-0001/materialscore/materialsitems/",
              form: material,
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          }
          request(options, function (error, response, body) {
              console.log(response.statusCode)
              res.send(JSON.parse(body));
          })
      } else {
        res.send("erro");
      }
    });
  }



module.exports = {
    getMaterials: getMaterials,
    addMaterial: addMaterial,
};
