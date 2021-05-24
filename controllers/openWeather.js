const request = require("request");

function getMeteo(req, res) {
    let options = {
      method: "GET",
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" + req.body.cidade +"&units=metric&lang=pt&appid=7a92211b516ede94411eae567fca23e7",
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
    getMeteo: getMeteo,
  };