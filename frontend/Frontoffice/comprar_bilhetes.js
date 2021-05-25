window.onload = () => {

    const bilhetes = document.getElementById("bilhetes")
    const price = document.getElementById("price")
    const form = document.getElementById("form")
    form.addEventListener("submit", async (event) => {

        event.preventDefault()
        const preco = document.getElementById("preco")
        const mat = document.getElementById("material").value
        //console.log(mat)
        const qtd = document.getElementById("qtd").value
        const pr = mat.split("+")
        const p = pr[0]
        console.log(p)
        console.log(mat + " --  " + qtd)
        precoTotal = parseFloat(p * qtd).toFixed(2)
        console.log(precoTotal)
        semIva = parseFloat(precoTotal / 1.23).toFixed(2)
        iva = parseFloat(precoTotal - semIva).toFixed(2)
        let strHTML =
            `<br><div style=background:white>
        <b style="color:black; text-align: left">Preço Total:</b> ${precoTotal}€<br>
        <b style="color:black; text-align: left">Preço sem Iva:</b> ${semIva}€<br>
        <b style="color:black; text-align: left">Iva:</b> ${iva}€<br>
        </div>`
        price.innerHTML = strHTML
    })

    const renderBilhetes = async () => {
        let strHtml = `
        
        <div class="container">
        <div class="row center">
        <div class="col-12">
                    
            `
        const response = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
        const materiais = await response.json()
        console.log(materiais)
        let i = 1
        for (const material of materiais) {
            // console.log(material.image)
            if (material.type == 3) {
                strHtml += `
           
         <div class="text-center" >
            <div class="single_latest_blog center" >  
                        <div class="block-7 w-100" >                
                            <div class="material">
                            <span class="excerpt d-block">${material.name}</span>
                            <span class="price"> <span class="number">${parseFloat(material.price * 1.23).toFixed(2)}€</span> <sub
                            style="color:gray">/bilhete</sub></span>                              
                            </div>
                        </div>
             </div> 
         </div>
                    
                
                `
                i++
            }
        }
        strHtml += `
            </div>
            </div>
            </div>
            
             
            `
        bilhetes.innerHTML = strHtml
    }
    renderBilhetes()

    const m = document.getElementById("m")
    const renderOpcMateriais = async () => {
        let strHtml = `
        <select class="form-control form-control" id="material" required >
        <option></option>
    `
        const response = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
        const mats = await response.json()
        let i = 1
        for (const mat of mats) {
            if (mat.type == 3) {
                strHtml += `
        <option value=${parseFloat(mat.price * 1.23).toFixed(2)}+${mat.product_id}>${mat.name} - ${parseFloat(mat.price * 1.23).toFixed(2)}€</option>
    `
                i++
            }
        }
        `
    </select>
    `
        m.innerHTML = strHtml

    }
    renderOpcMateriais()

}

async function f() {
    const mat = document.getElementById("material").value
    const pr = mat.split("+")
    var mat1 = pr[1]
    console.log(mat1)
    const cliente_id = localStorage.id
    const qtd = document.getElementById("qtd").value
    var preco = parseFloat(pr[0] * qtd).toFixed(2)
    console.log(preco)
    const qty = "-" + qtd
    const user = {
        qty: qty,
        product_id: mat1,
        cliente_id: cliente_id
    }
    console.log(user)

    const responseC = await fetch(`https://backend-easyfestival.herokuapp.com/getClientes`)
    const clients = await responseC.json()
    console.log(clients.clients)
    const c = clients.clients
    let j = 1
    for (const client of c) {
        console.log(client)
        if (client.email == cliente_id) {
            var nif = client.fiscal_id
            var nomeCliente = client.name
        }
        j++
    }

    console.log(nif)
    console.log(nomeCliente)
    console.log(mat1)

    const responseTR = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
    const pro = await responseTR.json()
    //const pro = products.items
    console.log(pro)
    //const c = clients.clients
    let q = 1
    for (const p of pro) {
        console.log(p.product_id)
        if (p.product_id == mat1) {
            console.log("entrei")
            var preco = parseFloat(p.price * 1.23).toFixed(2)
            var nomeP = p.name
        }
        q++
    }
    console.log(preco + " " + nomeP + " " + qtd)
    const fatura = {
        nome_cliente: nomeCliente,
        email: cliente_id,
        nif: nif,
        nome_produto: nomeP,
        descricao: nomeP,
        preco: preco,
        quantidade: qtd

    }
    console.log(fatura)
    const response = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
    const materiais = await response.json()
    //console.log(materiais)
    let i = 1
    for (const material of materiais) {
        if (material.type == 3) {
            if (material.product_id == mat1) {
                console.log("stock:    " + material.stock)
                stockAtual = material.stock - qtd
                console.log(stockAtual)
                if (stockAtual < 0) {
                    swal({ type: 'error', title: 'Stock de bilhetes esgotado', text: 'Falha na conclusão da ação' })
                    form.reset()
                } else {


                    //VAI COMEÇAR AQUI A PARTE DO PAYPAL


                    //pagar

                    const radio = document.getElementsByClassName("pagar");

                    console.log("dentro")
                    var status = ""
                    console.log("aqui")
                    console.log(preco)
                    paypal.Buttons({
                        style: {
                            color: 'blue',
                            shape: 'pill'
                        },
                        createOrder: function (data, actions) {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: preco,
                                        currency: 'EUR'
                                    }
                                }]
                            });
                        },
                        onApprove: function (data, actions) {
                            return actions.order.capture().then(function (details) {
                                console.log(details)
                                status = details.status
                                console.log(status)
                                if (details.status == "COMPLETED") {
                                    console.log("PAGOU")



                                    return fetch(`https://backend-easyfestival.herokuapp.com/buyTicket`, {
                                        headers: {
                                            "Accept": "application/json",
                                            "Content-Type": "application/json"
                                        },
                                        method: "POST",
                                        body: JSON.stringify(user)

                                    }).then(result => {
                                        console.log(result.status)
                                        if (result.status == "200") {
                                            console.log("cheguei a seguir ao 200")
                                            return fetch(`https://backend-easyfestival.herokuapp.com/createInvoice`, {
                                                headers: {
                                                    "Access-Control-Allow-Origin": "*",
                                                    "Accept": "application/json",
                                                    "Content-Type": "application/json"
                                                },
                                                method: "POST",
                                                body: JSON.stringify(fatura)
                                            }).then(result => {
                                                console.log(result)
                                                swal({ type: 'success', title: 'Bilhete comprado', text: 'Ação concluída com sucesso. A fatura foi enviada para o seu email' })
                                            form.reset()
                                            })
                                            /*                                        
                                            responseFatura = await fetch(`https://backend-easyfestival.herokuapp.com/createInvoice`, {
                                                headers: {
                                                    "Access-Control-Allow-Origin": "*",
                                                    "Accept": "application/json",
                                                    "Content-Type": "application/json"
                                                },
                                                method: "POST",
                                                body: JSON.stringify(fatura)
                                            })
                                            swal({ type: 'success', title: 'Bilhete comprado', text: 'Ação concluída com sucesso' })
                                            form.reset()
                                        })*/

                                        } else {
                                            swal({ type: 'error', title: 'Falha no pagamento', text: 'Erro no pagamento' })
                                            form.reset()
                                        }
                                    })
                                } else {
                                    swal({ type: 'error', title: 'Falha no pagamento', text: 'Erro no pagamento' })
                                    form.reset()
                                }
                            })
                        }
                    }).render('#paypal-button');





                    //FIM DO PAYPAL


                    /*response1 = await fetch(`https://backend-easyfestival.herokuapp.com/buyTicket`, {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify(user)

                    })
                    const responseC = await fetch(`https://backend-easyfestival.herokuapp.com/getClientes`)
                    const clients = await responseC.json()
                    console.log(clients.clients)
                    const c = clients.clients
                    let j = 1
                    for (const client of c) {
                        console.log(client)
                        if (client.email == cliente_id) {
                            var nif = client.fiscal_id
                            var nomeCliente = client.name
                        }
                        j++
                    }
                    console.log(nif)
                    console.log(nomeCliente)
                    console.log(mat1)
                    const responseTR = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
                    const pro = await responseTR.json()
                    //const pro = products.items
                    console.log(pro)
                    //const c = clients.clients
                    let q = 1
                    for (const p of pro) {
                        console.log(p.product_id)
                        if (p.product_id == mat1) {
                            console.log("entrei")
                            var preco = parseFloat(p.price * 1.23).toFixed(2)
                            var nomeP = p.name
                        }
                        q++
                    }
                    console.log(preco + " " + nomeP + " " + qtd)
                    const fatura = {
                        nome_cliente: nomeCliente,
                        email: cliente_id,
                        nif: nif,
                        nome_produto: nomeP,
                        descricao: nomeP,
                        preco: preco,
                        quantidade: qtd

                    }

                    responseFatura = await fetch(`https://backend-easyfestival.herokuapp.com/createInvoice`, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify(fatura)
                    })
                    swal({ type: 'success', title: 'Bilhete comprado', text: 'Ação concluída com sucesso' })
                    form.reset()*/
                }
            }

            i++
        }
    }

}