window.onload = () => {

    const materials = document.getElementById("materiais")
    const price = document.getElementById("price")
    const form = document.getElementById("form")
    const pagar = document.getElementById("pagar")

    form.addEventListener("submit", async (event) => {

        event.preventDefault()
        const preco = document.getElementById("preco")
        const mat = document.getElementById("material").value
        const qtd = document.getElementById("qtd").value
        const pr = mat.split("+")
        const p = pr[0]
        //console.log(p)
        //console.log(mat+" --  "+qtd)
        var precoTotal = parseFloat(p * qtd).toFixed(2)
        //console.log(precoTotal)
        var semIva = parseFloat(precoTotal / 1.23).toFixed(2)
        var iva = parseFloat(precoTotal - semIva).toFixed(2)
        var caucaoMaterial = parseFloat(precoTotal*0.5).toFixed(2)
        console.log(caucaoMaterial)
        var pCC = parseFloat(precoTotal)+parseFloat(caucaoMaterial)
        console.log(pCC)
        var precoComCaucao = parseFloat(pCC).toFixed(2)
        let strHTML =
            `<br><div style=background:white>
        <b style="color:black; text-align: left">Preço Total:</b> ${precoComCaucao}€<br>
        <b style="color:black; text-align: left">Preço do Material:</b> ${precoTotal}€<br>
        <b style="color:black; text-align: left">Caução:</b> ${caucaoMaterial}€<br>
        </div>`
        price.innerHTML = strHTML
    })

    const renderMateriais = async () => {
        let strHtml = `
      
        <div class="container">
        <div class="row center">
        <div class="col-12">
                    
            `
        const response = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
        const materiais = await response.json()
        //console.log(materiais)
        let i = 1
        for (const material of materiais) {
            console.log(material.image)
            if (material.type == 1) {
                strHtml += `
         
         <div class="text-center" >
            <div class="single_latest_blog center" >  
                        <div class="block-7 w-100" >                
                            <div class="material">
                            <span class="excerpt d-block">${material.name}</span>
                            <span class="price"> <span class="number">${parseFloat(material.price * 1.23).toFixed(2)}€</span> <sub
                            style="color:gray">/unidade</sub></span>                              
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
        materials.innerHTML = strHtml
    }
    renderMateriais()



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
            if (mat.type == 1) {
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
    const mat1 = pr[1]
    const qtd = document.getElementById("qtd").value
    var preco = parseFloat(pr[0] * qtd).toFixed(2)
    var precoCaucao = parseFloat(preco) + parseFloat(preco*0.5)
    console.log(precoCaucao)
    var precoFinalFinal = parseFloat(precoCaucao).toFixed(2)
    console.log(precoFinalFinal)
    const qty = "-" + qtd
    const cliente_id = localStorage.id
    const user = {
        qty: qty,
        product_id: mat1,
        cliente_id: cliente_id
    }

    const responseC = await fetch(`https://backend-easyfestival.herokuapp.com/getClientes`)
    const clients = await responseC.json()
    const c = clients.clients
    let j = 1
    for (const client of c) {
        if (client.email == cliente_id) {
            var nif = client.fiscal_id
            var nomeCliente = client.name
        }
        j++
    }
    const responseTR = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
    const pro = await responseTR.json()
    let q = 1
    for (const p of pro) {
        console.log(p.product_id)
        if (p.product_id == mat1) {
            var precoF = parseFloat(p.price * 1.23).toFixed(2)
            var nomeP = p.name
        }
        q++
    }
    const fatura = {
        nome_cliente: nomeCliente,
        email: cliente_id,
        nif: nif,
        nome_produto: nomeP,
        descricao: nomeP,
        preco: precoF,
        quantidade: qtd

    }
    console.log(fatura)
    const response = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
    const materiais = await response.json()
    let i = 1
    for (const material of materiais) {
        if (material.type == 1) {
            if (material.product_id == mat1) {
                stockAtual = material.stock - qtd
                if (stockAtual < 0) {
                    swal({ type: 'error', title: 'Stock de materiais esgotado', text: 'Falha na conclusão da ação' })
                    form.reset()
                } else {
                    const radio = document.getElementsByClassName("pagar");
                    var status = ""
                    paypal.Buttons({
                        style: {
                            color: 'blue',
                            shape: 'pill'
                        },
                        createOrder: function (data, actions) {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: precoFinalFinal,
                                        currency: 'EUR'
                                    }
                                }]
                            });
                        },
                        onApprove: function (data, actions) {
                            return actions.order.capture().then(function (details) {
                                status = details.status
                                if (details.status == "COMPLETED") {

                                    return fetch(`https://backend-easyfestival.herokuapp.com/stock`, {
                                        headers: {
                                            "Accept": "application/json",
                                            "Content-Type": "application/json"
                                        },
                                        method: "POST",
                                        body: JSON.stringify(user)

                                    }).then(result => {
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
                                                swal({ type: 'success', title: 'Material alugado', text: 'Ação concluída com sucesso' })
                                                form.reset()
                                            })


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
                }
            }

            i++
        }
    }
}
