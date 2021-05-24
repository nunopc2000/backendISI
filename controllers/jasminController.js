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
            url: "https://my.jasminsoftware.com/api/252175/252175-0001/materialsCore/materialsItems",
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

  function getClients(req, res) {
    login(function (token) {
      if (token) {
          let options = {
              method: 'GET',
              url: "https://my.jasminsoftware.com/api/252175/252175-0001/salesCore/customerParties",
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

  function addClient(req, res) {
    login(function (token) {
      if (token) {
        let user = {};
        user["name"] = req.body.nome;
        user["electronicMail"] = req.body.email;
        user["telephone"] = req.body.telemovel;
        user["companyTaxID"] = req.body.nif;
        console.log(user);
          
          let options = {
              method: 'POST',
              url: "https://my.jasminsoftware.com/api/252175/252175-0001/salesCore/customerParties",
              form: user,
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

  function getInvoices(req, res) {
    login(function (token) {
      if (token) {
          let options = {
              method: 'GET',
              url: "https://my.jasminsoftware.com/api/252175/252175-0001/billing/invoices",
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

  function addInvoice(req, res) {
    login(function (token) {
      if (token) {
        let user = {};
        user["name"] = req.body.nome;
        user["electronicMail"] = req.body.email;
        user["telephone"] = req.body.telemovel;
        user["companyTaxID"] = req.body.nif;
        console.log(user);
          
          let options = {
              method: 'POST',
              url: "https://my.jasminsoftware.com/api/252175/252175-0001/salesCore/customerParties",
              form: user,
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

  function insertClient(req, res) {
    login(function (token) {
        if (token) {

          let user = {};
          user["name"] = req.body.nome;
          user["electronicMail"] = req.body.email;
          user["telephone"] = req.body.telemovel;
          user["companyTaxID"] = req.body.nif;
          user["isExternallyManaged"] = false;
          user["currency"] = "EUR";
          user["customerGroup"] = "01";
          user["country"] = "PT";
          user["priceList"] = "03";
          console.log(user);
            let options = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=utf-8',
                    'Content-Length': JSON.stringify(user).length
                },
                url: `https://my.jasminsoftware.com/api/252175/252175-0001/salescore/customerParties`,
                body: JSON.stringify(user)
            }
            request.post(options, (err, res) => {
                if (!err && res.statusCode == 201) {
                    const record_id = JSON.parse(res.body);

                    options = {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        url: `https://my.jasminsoftware.com/api/252175/252175-0001/salescore/customerParties/${record_id}`
                    }
                    request.get(options, (err, res) => {
                        if (!err && res.statusCode == 200) {
                          res({
                                'statusCode': res.statusCode,
                                'body': {
                                    customer_id: JSON.parse(res.body).partyKey
                                }
                            })
                        } else {
                          res({
                                'statusCode': res.statusCode,
                                'body': res.body
                            })
                        }
                    })
                } else {
                  res({
                        'statusCode': res.statusCode,
                        'body': res.body
                    })
                }
            })
        } else {
          res({
                'statusCode': res.statusCode,
                'body': res.body
            })
        }
    })
}


module.exports = {
    getMaterials: getMaterials,
    addMaterial: addMaterial,
    addClient: addClient,
    getClients: getClients,
    addInvoice:addInvoice,
    getInvoices: getInvoices,
    insertClient: insertClient
};
