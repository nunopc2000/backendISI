const request = require("request");

//GET
function getAllBills(req, res) {
    let options = {
      method: "GET",
      url:
        "https://api.moloni.pt/v1/invoices/getAll/?access_token=[current_access_token]",
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

  function getBillsByID(req, res) {
    let options = {
      //const id =
      method: "GET",
      url:
        "https://api.moloni.pt/v1/invoices/getOne/?access_token=[current_access_token]",
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

  module.exports = {
    getAllBills: getAllBills,
    getBillsByID: getBillsByID,
  };