window.onload = () => {
    const diag = document.getElementById("diag")
    const form = document.getElementById("form")

    form.addEventListener("submit", async (event) => {

        event.preventDefault()
        const id_aluguer = document.getElementById("id_aluguer").value
        console.log(id_aluguer)
        console.log("+++++++++++")
        const response = await fetch(`http://localhost:5050/stockMovs`)
        const movs = await response.json()
        let i = 1
        for (const mov of movs) {
            if (id_aluguer == mov.product_stock_id) {
                console.log("----entrei.----")
                console.log(mov.qty)
                var product_id = mov.product_id
                console.log(product_id)
                const response1 = await fetch(`http://localhost:5050/products`)
                const materiais = await response1.json()
                let j = 1
                for (const mat of materiais) {
                    if (product_id == mat.product_id) {
                        var preco = parseFloat(mat.price * 1.23).toFixed(2)
                        console.log(preco)
                        j++
                    }
                }
            }
            i++
        }
        var caucao = preco * 0.5
        console.log(preco)
        let strHTML =
            `<br><div style=background:white>
        <b style="color:black; text-align: left">Caução a devolver: </b> 
        <input >${caucao}€<br>
        </div>`
        diag.innerHTML = strHTML
    })
}

async function button() {
    const id_aluguer = document.getElementById("id_aluguer").value
    console.log(id_aluguer)

    console.log("+++++++++++")
    const response = await fetch(`http://localhost:5050/stockMovs`)
    const movs = await response.json()
    let i = 1
    for (const mov of movs) {
        if (id_aluguer == mov.product_stock_id) {
            console.log("----entrei.----")
            console.log(Math.abs(mov.qty))
            var product_id = mov.product_id
            var quanti = Math.abs(mov.qty)
            console.log(product_id)
            const response1 = await fetch(`http://localhost:5050/products`)
            const materiais = await response1.json()
            let j = 1
            for (const mat of materiais) {
                if (product_id == mat.product_id) {
                    var preco = parseFloat(mat.price * 1.23 * quanti).toFixed(2)
                    console.log(preco)

                    j++

                }


            }

        }
        i++
    }

    console.log(preco)
    var precoDevolucao = preco * 0.5

    let caucao = document.getElementById("caucao")
    const condicao = document.getElementsByName("danificado")
    const tempo = document.getElementsByName("tempo")
    let caucaoFinal = document.getElementById("caucao").value
    for (i = 0; i < condicao.length; i++) {
        if (condicao[i].checked)
            var estado = condicao[i].value
    }
    for (i = 0; i < tempo.length; i++) {
        if (tempo[i].checked)
            var prazo = tempo[i].value
    }
    console.log(estado)
    console.log(prazo)
    if (estado == "S") {
        if (prazo == "S") {
            caucaoFinal = 0.00
        } else {
            caucaoFinal = 0.00
        }
    } else if (estado == "N") {
        if (prazo == "S") {
            caucaoFinal = precoDevolucao
        } else {
            caucaoFinal = precoDevolucao * 0.8
        }
    } else {
        swal({ type: 'error', title: 'Caução não calculada', text: 'Preenche todos os campos' })
    }
    caucao.innerHTML = caucaoFinal
    console.log(caucaoFinal)
    document.getElementById("caucao").value = caucaoFinal
}

async function submeter() {
    let caucaoFinal = document.getElementById("caucao").value
    console.log(caucaoFinal)
    const id_aluguer = document.getElementById("id_aluguer").value
    console.log(id_aluguer)

    const response = await fetch(`http://localhost:5050/stockMovs`)
    const movs = await response.json()
    let i = 1
    for (const mov of movs) {
        const id = mov.product_stock_id
            if (id == id_aluguer) {
                const e = String(mov.notes).split(":")
                var email = e[0]
                var qty = Math.abs(mov.qty)
                console.log(qty)
                
                var product_id = mov.product_id
                i++
                console.log("entrei")
            }
    }

    const user = {
        notes: email,
        product_stock_id: id_aluguer
    }

    const mov = {
        qty: qty,
        product_id: product_id
    }

    try {
        response1 = await fetch(`http://localhost:5050/devolverProduto`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(user)

        })

        response5 = await fetch(`http://localhost:5050/editProduct`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(mov)

        })

        
        console.log(user)
        swal({ type: 'success', title: 'Devolução efetuada', text: 'Material devolvido com sucesso' })
    } catch (err) {
        swal({ type: 'error', title: 'Falha na entrega', text: err })
    }

}