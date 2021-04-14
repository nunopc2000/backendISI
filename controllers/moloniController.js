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

  function insertClient(nif, nome, email, callback) {
    getNextNumber((res) => {
        if (res.company_id) {
            const company_id = res.company_id;
            const access_token = res.access_token;
            const next_number = res.next_number;

            const json = querystring.stringify({
                company_id: company_id,
                vat: nif,
                number: next_number,
                name: nome,
                language_id: 1,
                address: '',
                zip_code: '',
                city: '',
                country_id: 1,
                email: email,
                website: '',
                phone: '',
                fax: '',
                contact_name: '',
                contact_email: '',
                contact_phone: '',
                notes: '',
                salesman_id: 0,
                price_class_id: 0,
                maturity_date_id: 0,
                payment_day: 0,
                discount: 0,
                credit_limit: 0,
                payment_method_id: 0,
                delivery_method_id: 0,
                field_notes: ''
            })

            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/customers/insert/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    callback({
                        'statusCode': res.statusCode,
                        'body': {
                            customer_id: JSON.parse(res.body).customer_id
                        }
                    })
                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    })
                }
            })
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': res.body
            });
        }
    })
}


  module.exports = {
    getAllBills: getAllBills,
    getBillsByID: getBillsByID,
  };