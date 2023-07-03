const querystring = require('querystring');
const req = require('request');

//GET
function login(callback) {
  let options = {
      url: `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=trabalhoisi&client_secret=d96702e79bdae466f779aadc227e9e18587d7a2d`
  }
  req.get(options, (err, res) => {
      if (!err && res.statusCode == 200) {
        //console.log(res.statusCode);
          callback({
              'access_token': JSON.parse(res.body).access_token
          });
          //console.log("Token:" +  JSON.parse(res.body).access_token);
      } else {
        //console.log(res.statusCode);
          callback({
              'statusCode': res.statusCode,
              'body': JSON.parse(res.body)
          });
      }
  })
}

function getCompany(callback) {
    login((res) => {
      if (res.access_token) {
          const access_token = res.access_token;
          //console.log("CONFIRMAÇÃO TOKEN: " + access_token);
          let options = {
              url: `https://api.moloni.pt/v1/companies/getAll/?access_token=${access_token}`
          }
          req.get(options, (err, res) => {
              if (!err && res.statusCode == 200) {
                  let resBody = JSON.parse(res.body);
                  let company_id = -1;
                  for (let i = 0; i < resBody.length; i++) {
                      if (resBody[i].email == "a89272@alunos.uminho.pt") {
                          company_id = resBody[i].company_id;
                          //console.log("COMPANY ID:" + company_id);
                      }
                  }
                  if (company_id != -1) {
                      callback({
                          'company_id': company_id,
                          'access_token': access_token
                      });
                  } else {
                      callback({
                          'statusCode': 404,
                          'body': {
                              'message': 'Company not found'
                          }
                      });
                  }
              } else {
                  callback({
                      'statusCode': res.statusCode,
                      'body': JSON.parse(res.body)
                  });
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


function getCategory(callback) {
  getCompany((res) => {
      if (res.company_id) {
          let access_token = res.access_token;
          let company_id = res.company_id;
          //console.log("CONFIRMAÇÃO COMPANY ID: " + company_id + " E O TOKEN: " + access_token);
          let json = querystring.stringify({
              company_id: company_id,
              parent_id: 0
          });
          let options = {
              headers: {
                  'Content-Length': json.length,
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              url: `https://api.moloni.pt/v1/productCategories/getAll/?access_token=${access_token}`,
              body: json
          }
          req.post(options, (err, res) => {
              if (!err && res.statusCode == 200) {
                  let resBody = JSON.parse(res.body);
                  let category_id = -1;
                  for (let i = 0; i < resBody.length; i++) {
                      if (resBody[i].name == "EasyFestival") {
                          category_id = resBody[i].category_id
                          //console.log("CATEGORY ID: " + category_id)
                      }
                  }
                  callback({
                      'company_id': company_id,
                      'access_token': access_token,
                      'category_id': category_id
                  });
              } else {
                  callback({
                      'statusCode': res.statusCode,
                      'body': JSON.parse(res.body)
                  });
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

function getTaxes(callback){
    getCategory((res) => {
        if (res.category_id) {
            const access_token = res.access_token;
            const company_id = res.company_id;
            const category_id = res.category_id;
            //console.log("CONFIRMAÇÃO CATEGORY ID: " + category_id);
            let json = querystring.stringify({
                company_id: company_id,
                category_id: category_id,
                qty: 0,
                offset: 0,
                with_invisible: 0
            });
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/taxes/getAll/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                } else {
                    response.status(400).send("Erro");
                }
            })
        } else {
          response.status(400).send("Erro");
        }
    })
}

function getProducts(reqest, response) {
  getCategory((res) => {
      if (res.category_id) {
          const access_token = res.access_token;
          const company_id = res.company_id;
          const category_id = res.category_id;
          //console.log("CONFIRMAÇÃO CATEGORY ID: " + category_id);
          let json = querystring.stringify({
              company_id: company_id,
              category_id: category_id,
              qty: 0,
              offset: 0,
              with_invisible: 0
          });
          let options = {
              headers: {
                  'Content-Length': json.length,
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              url: `https://api.moloni.pt/v1/products/getAll/?access_token=${access_token}`,
              body: json
          }
          req.post(options, (err, result) => {
              if (!err && result.statusCode == 200) {
                  response.status(200).send(JSON.parse(result.body))
              } else {
                  response.status(400).send("Erro");
              }
          })
      } else {
        response.status(400).send("Erro");
      }
  })
}

function getStockMovements(reqest, response) {
    getCategory((res) => {
        if (res.category_id) {
            const access_token = res.access_token;
            const company_id = res.company_id;
            const category_id = res.category_id;
            //console.log("CONFIRMAÇÃO CATEGORY ID: " + category_id);
            let json = querystring.stringify({
                company_id: company_id,
                category_id: category_id,
               /* qty: 0,
                offset: 0,
                with_invisible: 0*/
            });
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/productStocks/getAll/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                } else {
                    response.status(400).send("Erro");
                }
            })
        } else {
          response.status(400).send("Erro");
        }
    })
  }


  function insertProduct(request, response) {
    const preco = request.body.preco;
    const nome = request.body.nome;
    const stock = request.body.stock;
    console.log(stock);
    //console.log(preco);
    getCategory((result) => {
        if (result.company_id) {
            //Variaveis para receber o Iva e o preço sem IVA
            const x = preco;
            const semIva = x / 1.23;
            const iva = semIva * 0.23;
            const company_id = result.company_id;
            const access_token = result.access_token;
            const category_id = result.category_id;

            const json = querystring.stringify({
              company_id: company_id,
              category_id: category_id,
              type: 1,
              name: nome,
              reference: nome,
              price: semIva,
              unit_id: 1560131,
              has_stock: 1,
              stock: stock,
              at_product_category: "A",
              exemption_reason: 0,
              'taxes[0][tax_id]': 2185742,
              'taxes[0][value]': iva,
              'taxes[0][order]': 1,
              'taxes[0][cumulative]': 0
            });

            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/products/insert/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}

function insertBilhete(request, response) {
    const preco = request.body.preco;
    const nome = request.body.nome;
    const stock = request.body.stock;
    //console.log(preco);
    getCategory((result) => {
        if (result.company_id) {
            //Variaveis para receber o Iva e o preço sem IVA
            const x = preco;
            const semIva = x / 1.23;
            const iva = semIva * 0.23;
            console.log("Valor do IVA: " + iva);
            const company_id = result.company_id;
            const access_token = result.access_token;
            const category_id = result.category_id;

            const json = querystring.stringify({
                company_id: company_id,
                category_id: category_id,
                type: 3,
                name: nome,
                reference: nome,
                price: semIva,
                unit_id: 1560131,
                has_stock: 1,
                stock: stock,
                at_product_category: "A",
                exemption_reason: 0,
                'taxes[0][tax_id]': 2185742,
                'taxes[0][value]': iva,
                'taxes[0][order]': 1,
                'taxes[0][cumulative]': 0
              });

            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/products/insert/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}

function updateProduct(request, response) {
    const preco = request.body.preco;
    const nome = request.body.nome;
    const stock = request.body.stock;
    const product_id = request.body.product_id;
    console.log(request.body)

    console.log("Estou aqui");
    //console.log(preco);
    getCategory((result) => {
        if (result.company_id) {
            //Variaveis para receber o Iva e o preço sem IVA
            const x = preco;
            const semIva = x / 1.23;
            const iva = semIva * 0.23;
            console.log("Valor do IVA: " + iva);
            const company_id = result.company_id;
            const access_token = result.access_token;
            const category_id = result.category_id;

            const json = querystring.stringify({
              company_id: company_id,
              product_id: product_id,
              category_id: category_id,
              type: 1,
              name: nome,
              reference: nome,
              price: semIva,
              unit_id: 1560131,
              has_stock: 1,
              stock: stock,
              at_product_category: "A",
              exemption_reason: 0,
            });

            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/products/update/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                    console.log("Estou cá dentro");
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}

function updateBilhete(request, response) {
    const preco = request.body.preco;
    const nome = request.body.nome;
    const stock = request.body.stock;
    const product_id = request.body.product_id;
    console.log(request.body)

    console.log("Estou aqui");
    //console.log(preco);
    getCategory((result) => {
        if (result.company_id) {
            //Variaveis para receber o Iva e o preço sem IVA
            const x = preco;
            const semIva = x / 1.23;
            const iva = semIva * 0.23;
            console.log("Valor do IVA: " + iva);
            const company_id = result.company_id;
            const access_token = result.access_token;
            const category_id = result.category_id;

            const json = querystring.stringify({
              company_id: company_id,
              product_id: product_id,
              category_id: category_id,
              type: 3,
              name: nome,
              reference: nome,
              price: semIva,
              unit_id: 1560131,
              has_stock: 1,
              stock: stock,
              at_product_category: "A",
              exemption_reason: 0,
            });

            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/products/update/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                    console.log("Estou cá dentro");
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}

function deleteProduct(request, response) {
    console.log(request.params.id)
    console.log(request.body.product_id)
    const product_id = request.params.id;
    console.log(product_id)
    getCategory((result) => {
        if (result.category_id) {
            const access_token = result.access_token;
            const company_id = result.company_id;
            let json = querystring.stringify({
                company_id: company_id,
                product_id: product_id,
                //with_invisible: 0
            });
            console.log(product_id);
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/products/delete/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                } else {
                    response.status(400).send("Erro");
                }
            })
        } else {
          response.status(400).send("Erro");
        }
    })
  }

  function editarProduto(request, response) {
    const qty = request.body.qty;
    const product_id = request.body.product_id;
    //const cliente_id = request.body.cliente_id;
    console.log(product_id)
    console.log("Stock = " + qty);
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = ("0" + date_ob.getHours()).slice(-2);
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    const data = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    console.log(data);
    getCategory((result) => {
        if (result.company_id) {
            //Variaveis para receber o Iva e o preço sem IVA
            const company_id = result.company_id;
            const access_token = result.access_token;

            const json = querystring.stringify({
              company_id: company_id,
              product_id: product_id,
              movement_date: data,
              qty: qty,
            });
            console.log(json)
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/productStocks/insert/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}

  function insertProductStock(request, response) {
    const qty = request.body.qty;
    const product_id = request.body.product_id;
    const cliente_id = request.body.cliente_id;
    console.log(cliente_id)
    console.log("Stock = " + qty);
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = ("0" + date_ob.getHours()).slice(-2);
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    const data = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    console.log(data);
    getCategory((result) => {
        if (result.company_id) {
            //Variaveis para receber o Iva e o preço sem IVA
            const company_id = result.company_id;
            const access_token = result.access_token;

            const json = querystring.stringify({
              company_id: company_id,
              product_id: product_id,
              movement_date: data,
              qty: qty,
              notes: cliente_id+":0"
            });
            console.log(json)
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/productStocks/insert/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}

function comprarBilhete(request, response) {
    const qty = request.body.qty;
    const product_id = request.body.product_id;
    const cliente_id = request.body.cliente_id;
    //console.log(cliente_id)
    //console.log("Stock = " + qty);
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = ("0" + date_ob.getHours()).slice(-2);
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    const data = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    //console.log(data);
    getCategory((result) => {
        if (result.company_id) {
            //Variaveis para receber o Iva e o preço sem IVA
            const company_id = result.company_id;
            const access_token = result.access_token;

            const json = querystring.stringify({
              company_id: company_id,
              product_id: product_id,
              movement_date: data,
              qty: qty,
              notes: cliente_id+":4"
            });
            console.log(json)
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/productStocks/insert/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}

function confirmBilhete(request, response) {
    const product_stock_id = request.body.product_stock_id;
    const email = request.body.notes;
    console.log(product_stock_id)
    console.log(email)
    /*const notes = request.body.notes;
    const product_stock_id = request.body.product_stock_id;
    console.log(product_stock_id);
    console.log(notes);*/
    const not = email+":3"
    /*const notas = querystring.stringify({
        email: notes,
        flag:1
    });*/
    /*const e = String(notes).split(":")
    const email = e[0]
    const a = e[1]*/
    getCategory((result) => {
        if (result.company_id) {
            //Variaveis para receber o Iva e o preço sem IVA
            
            const company_id = result.company_id;
            const access_token = result.access_token;
            const category_id = result.category_id;

            const json = querystring.stringify({
              company_id: company_id,
              product_stock_id: product_stock_id,
              //category_id: category_id,
              notes: not
            });
            console.log(access_token)
            console.log(json)
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/productStocks/update/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                console.log(result.statusCode)
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                    console.log("Estou cá dentro");
                    console.log(JSON.parse(result.body));
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}

function confirmAluguer(request, response) {
    const product_stock_id = request.body.product_stock_id;
    const email = request.body.notes;
    console.log(product_stock_id)
    console.log(email)
    /*const notes = request.body.notes;
    const product_stock_id = request.body.product_stock_id;
    console.log(product_stock_id);
    console.log(notes);*/
    const not = email+":1"
    /*const notas = querystring.stringify({
        email: notes,
        flag:1
    });*/
    /*const e = String(notes).split(":")
    const email = e[0]
    const a = e[1]*/
    getCategory((result) => {
        if (result.company_id) {
            //Variaveis para receber o Iva e o preço sem IVA
            
            const company_id = result.company_id;
            const access_token = result.access_token;
            const category_id = result.category_id;

            const json = querystring.stringify({
              company_id: company_id,
              product_stock_id: product_stock_id,
              //category_id: category_id,
              notes: not
            });
            console.log(access_token)
            console.log(json)
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/productStocks/update/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                console.log(result.statusCode)
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                    console.log("Estou cá dentro");
                    console.log(JSON.parse(result.body));
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}


function devolverMaterial(request, response) {
    const product_stock_id = request.body.product_stock_id;
    const email = request.body.notes;
    console.log(product_stock_id)
    console.log(email)
    /*const notes = request.body.notes;
    const product_stock_id = request.body.product_stock_id;
    console.log(product_stock_id);
    console.log(notes);*/
    const not = email+":2"
    /*const notas = querystring.stringify({
        email: notes,
        flag:1
    });*/
    /*const e = String(notes).split(":")
    const email = e[0]
    const a = e[1]*/
    getCategory((result) => {
        if (result.company_id) {
            //Variaveis para receber o Iva e o preço sem IVA
            
            const company_id = result.company_id;
            const access_token = result.access_token;
            const category_id = result.category_id;

            const json = querystring.stringify({
              company_id: company_id,
              product_stock_id: product_stock_id,
              //category_id: category_id,
              notes: not
            });
            console.log(access_token)
            console.log(json)
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/productStocks/update/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, result) => {
                console.log(result.statusCode)
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                    console.log("Estou cá dentro");
                    console.log(JSON.parse(result.body));
                } else {
                    response.status(400).send("erro");
                }
            })
        } else {
            response.status(400).send("erro");
        }
    })
}


  module.exports = {
    // getAllBills: getAllBills,
    // getBillsByID: getBillsByID,
    getProducts: getProducts,
    insertProduct: insertProduct,
    insertBilhete:insertBilhete,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct,
    insertProductStock:insertProductStock,
    getStockMovements:getStockMovements,
    confirmAluguer:confirmAluguer,
    comprarBilhete:comprarBilhete,
    editarProduto:editarProduto,
    updateBilhete:updateBilhete,
    devolverMaterial:devolverMaterial,
    confirmBilhete:confirmBilhete
  };
