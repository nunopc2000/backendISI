const { response } = require("express");
const { type } = require("os");
const req = require("request");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function getAllInvoices(request, response) {
  var http = require("https");
  const api_key = "07be8c437caa9c36c6e1e22ebb8ed5486f286403";

  var options = {
    method: "GET",
    hostname: "easyfestival-2.app.invoicexpress.com",
    port: null,
    path: `/invoices.json?api_key=${api_key}`,
    headers: {
      accept: "application/json",
    },
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      response.send(JSON.parse(body));
      //console.log(body.toString());
      console.log(res.statusCode);
    });
  });

  req.end();
}

function insertInvoice(request, response) {
  var http = require("https");
  const api_key = "07be8c437caa9c36c6e1e22ebb8ed5486f286403";
  const nome_cliente = request.body.nome_cliente;
  const email = request.body.email;
  const nif = request.body.nif;
  const nome_produto = request.body.nome_produto;
  const descricao = request.body.descricao;
  const preco = request.body.preco;
  const valor_item = preco / 1.23;
  const quantidade = request.body.quantidade;
  console.log(request.body)
  var data = new Date();

  var options = {
    method: "POST",
    hostname: "easyfestival-2.app.invoicexpress.com",
    port: null,
    path: `/invoice_receipts.json?api_key=${api_key}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      //console.log(body.toString());
      console.log(res.statusCode);
      //console.log(body.toString());
      sleep(2000);
      passarParaFaturaPaga(function (ignore){})
      sendEmail(function (ignore){})
      
      response.send(JSON.parse(body));
    });
  });

  req.write(
    JSON.stringify({
      invoice: {
        status: 'settled',
        date: data,
        due_date: data,
        client: { name: nome_cliente, code: nif, email: email },
        items: [
          {
            name: nome_produto,
            description: descricao,
            unit_price: valor_item,
            quantity: quantidade,
          },
        ],
      },
    })
  );
  req.end();
}

function getDraftInvoices(callback) {
  var http = require("https");
  const api_key = "07be8c437caa9c36c6e1e22ebb8ed5486f286403";

  var options = {
    method: "GET",
    hostname: "easyfestival-2.app.invoicexpress.com",
    port: null,
    path: `/invoices.json?api_key=${api_key}`,
    headers: {
      accept: "application/json",
    },
  };

  var req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      let email = " ";
      let document_id = -1;
      let dados = JSON.parse(body.toString());
      let array = dados.invoices;
      //console.log(body);
      for (let i = 0; i < array.length; i++) {
        if (array[i].status == "draft") {
          document_id = array[i].id;
          email = array[i].client.email;
          return callback({"document_id": document_id, "email": email})
          console.log("DOCUMENT ID: " + document_id);
          console.log("EMAIL DO CLIENTE: " + email);
          console.log(array[i]);
        }
      }
      return callback(false);
    });
  });

  req.end();
}

// function passarParaFaturaFinal(request, response) {
//   getDraftInvoices((res) => {
//     const document_id = res.document_id;
//     console.log(document_id);

//   var http = require("https");
//   const api_key = "07be8c437caa9c36c6e1e22ebb8ed5486f286403";

//   var options = {
//     method: "PUT",
//     hostname: "easyfestival-2.app.invoicexpress.com",
//     port: null,
//     path: `/invoice_receipts/${document_id}/change-state.json?api_key=${api_key}`,
//     headers: {
//       accept: "application/json",
//       "content-type": "application/json",
//     },
//   };

//   var req = http.request(options, function (res) {
//     var chunks = [];

//     res.on("data", function (chunk) {
//       chunks.push(chunk);
//     });

//     res.on("end", function () {
//       var body = Buffer.concat(chunks);
//       response.send(body);
//       //console.log(body.toString());
//       console.log(res.statusCode);
//     });
//   });

//   req.write(
//     JSON.stringify({
//       invoice: { state: "finalized", message: "Wrong invoice totals." },
//     })
//   );
//   req.end();
// })
// }


function passarParaFaturaPaga(callback) {
  getDraftInvoices((res) => {
    const document_id = res.document_id;
    //console.log(document_id);
  var http = require("https");
  const api_key = "07be8c437caa9c36c6e1e22ebb8ed5486f286403";

  var options = {
    method: "PUT",
    hostname: "easyfestival-2.app.invoicexpress.com",
    port: null,
    path: `/invoice_receipts/${document_id}/change-state.json?api_key=${api_key}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      //response.send(body);
      //console.log(body.toString());
      //console.log(res.statusCode);
      if (res.statusCode == 200) {
        //console.log(res.statusCode);
        return callback(true);
      } else {
        return callback(false);
      }
    });
  });

  req.write(
    JSON.stringify({
      invoice: { state: "finalized", message: "Wrong invoice totals." },
    })
  );
  req.end();
})
}

function sendEmail(callback) {
  getDraftInvoices((res) => {
  var http = require("https");
  const api_key = "07be8c437caa9c36c6e1e22ebb8ed5486f286403";
  const document_id = res.document_id;
  const email = res.email;
  //console.log("DOCUMENT ID: " + document_id);
  //console.log("EMAIL :" + email);

  var options = {
    method: "PUT",
    hostname: "easyfestival-2.app.invoicexpress.com",
    port: null,
    path: `/invoice_receipts/${document_id}/email-document.json?api_key=${api_key}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      if (res.statusCode == 200) {
        //console.log(res.statusCode);
        return callback(true);
      } else {
        return callback(false);
      }
    });
  });

  req.write(
    JSON.stringify({
      message: {
        client: { email: email, save: "0" },
        subject: "Fatura recibo da sua compra na EasyFestival",
        body: "Caro Cliente, enviamos em anexo a fatura das suas compras."+ 
        "Esperamos que aproveite da melhor forma toda a experiência que o festival pode proporcionar."+ 
        "Atenciosamente, a equipa EasyFestival"
      },
    })
  );
  req.end();
})
}

function getClients(request, response) {
  var http = require("https");
  const api_key = "07be8c437caa9c36c6e1e22ebb8ed5486f286403";

  var options = {
    method: "GET",
    hostname: "easyfestival-2.app.invoicexpress.com",
    port: null,
    path: `/clients.json?api_key=${api_key}`,
    headers: {
      accept: "application/json",
    },
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      response.send(JSON.parse(body));
      //console.log(body.toString());
      console.log(res.statusCode);
    });
  });

  req.end();
}

function insertClients(request, response) {
  var http = require("https");
  const api_key = "07be8c437caa9c36c6e1e22ebb8ed5486f286403";
  const nome = request.body.nome;
  const nif = request.body.nif;
  const email = request.body.email;
  const phone = request.body.phone;

  var options = {
    method: "POST",
    hostname: "easyfestival-2.app.invoicexpress.com",
    port: null,
    path: `/clients.json?api_key=${api_key}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      response.send(JSON.parse(body));
      //console.log(body.toString());
      console.log(res.statusCode);
    });
  });

  req.write(
    JSON.stringify({
      client: {
        name: nome,
        code: nif,
        email: email,
        language: "pt",
        country: "Portugal",
        fiscal_id: nif,
        website: "www.invoicexpress.com",
        phone: phone,
        send_options: "1",
      },
    })
  );
  req.end();
}

function getItems(request, response) {
  var http = require("https");
  const api_key = "07be8c437caa9c36c6e1e22ebb8ed5486f286403";

  var options = {
    method: "GET",
    hostname: "easyfestival-2.app.invoicexpress.com",
    port: null,
    path: `/items.json?api_key=${api_key}`,
    headers: {
      accept: "application/json",
    },
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      response.send(JSON.parse(body));
      //console.log(body.toString());
      console.log(res.statusCode);
    });
  });

  req.end();
}

function insertItems(request, response) {
  var http = require("https");
  const api_key = "07be8c437caa9c36c6e1e22ebb8ed5486f286403";
  const nome = request.body.nome;
  const preco = request.body.preco;
  const descricao = request.body.nome;
  const valor_item = preco / 1.23;

  var options = {
    method: "POST",
    hostname: "easyfestival-2.app.invoicexpress.com",
    port: null,
    path: `/items.json?api_key=${api_key}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      response.send(JSON.parse(body));
      //console.log(body.toString());
      console.log(res.statusCode);
    });
  });

  req.write(
    JSON.stringify({
      item: {
        name: nome,
        description: descricao,
        unit_price: valor_item,
        unit: "unit",
        tax: { name: "IVA23" },
      },
    })
  );
  req.end();
}

module.exports = {
  insertInvoice: insertInvoice,
  getAllInvoices: getAllInvoices,
  getClients: getClients,
  getItems: getItems,
  insertClients: insertClients,
  insertItems: insertItems,
};
