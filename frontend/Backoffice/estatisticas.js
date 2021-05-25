window.onload = () => {

    const TotalP = document.getElementById("chartPreferences2")

    const renderPlaces = async () => {
        let strHtml = ``
        var t
        var t2 = 0
        const productsId = []
        const productsType = []
        const productPrice = []
        const response1 = await fetch(`http://localhost:5050/products`)
        const mats = await response1.json()
        let cont = 0
        for (const mat of mats) {
            productsId[cont] = mat.product_id
            productsType[cont] = mat.type
            productPrice[cont] = mat.price
            cont++
        }
        const response = await fetch(`http://localhost:5050/stockMovs`)
        const materiais = await response.json()
        let i = 1
        var qt = 0
        for (const material of materiais) {
            //console.log(material.product.name)
            for (i = 0; i < productsId.length; i++) {
                if (productsId[i] == material.product_id && productsType[i] == 3) {
                    qt += material.qty
                    //console.log(qt)
                    //console.log("Mat: "+mat.reference+"  qty: "+qt)

                    //console.log("Mat: "+mat.reference+"  qty: "+qt)
                    strHtml += `
            <div class="d-flex justify-content-between mb-1">
            <div>
                    <span class="text-muted fw-bold">Atividade ${material.product.name}</span>
                    <span class="text-muted " style="text-align: right;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${TotalP.participantes} participantes</span>
                    
                <div class="progress mb-2" style="height: 8px; width: 450px">
                    <div class="progress-bar bg-success" role="progressbar" style="width:%" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-placement="top" title="%"></div>
                    </div>
                    </div>
                    </div>
        `
                    //console.log(TotalP.percentagem)
                }
                i++

            }
        }
        TotalP.innerHTML = strHtml

    }
    renderPlaces()


    const NGM = document.getElementById("NGM")

    const renderTotal = async () => {
        let strHtml = `
        <p class="card-category" style="color: black">Número de Gestores de Materiais</p>`

        const response = await fetch(`http://localhost:5050/users`)
        const users = await response.json()
        const user = users.data
        let j = 1
        var contM = 0
        for (const u of user) {
            //console.log(u.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52)
            if (u.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52 == "Gestor de Materiais") {
                contM++
            }
        }
        j++
        //console.log(contM)
        strHtml += `

            <b class="card-title" >${contM} gestores</b>`
        NGM.innerHTML = strHtml
    }
    renderTotal()

    const NGB = document.getElementById("NGB")
    const renderGB = async () => {
        let strHtml = `
        <p class="card-category" style="color: black">Número de Gestores de Bilhetes</p>`

        const response = await fetch(`http://localhost:5050/users`)
        const users = await response.json()
        const user = users.data
        let i = 1
        var contB = 0
        for (const u of user) {
            //console.log(u.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52)
            if (u.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52 == "Gestor de Bilhetes") {
                contB++
            }
        }
        i++
        //console.log(contB)
        strHtml += `

            <b class="card-title" >${contB} gestores</b>`
        NGB.innerHTML = strHtml
    }
    renderGB()

    const NE = document.getElementById("NE")
    const renderNE = async () => {
        let strHtml = `
        <p class="card-category" style="color: black">Número de estabelecimentos</p>`

        const response = await fetch(`http://localhost:5050/places`)
        const places = await response.json()
        const place = places.data
        //console.log(place)
        let i = 1
        var contE = 0
        for (const p of place) {
            contE++
        }
        i++
        //console.log(contE)
        strHtml += `

            <b class="card-title" >${contE} estabelecimentos</b>`
        NE.innerHTML = strHtml
    }
    renderNE()

    const Clientes = document.getElementById("Clientes")
    const renderC = async () => {
        let strHtml = `
        <p class="card-category" style="color: black">Número de Clientes Registados</p>`

        const response = await fetch(`http://localhost:5050/users`)
        const users = await response.json()
        const user = users.data
        let i = 1
        var contB = 0
        for (const u of user) {
            //console.log(u.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52)
            if (u.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52 == "Cliente") {
                contB++
            }
        }
        i++
        //console.log(contB)
        strHtml += `

            <b class="card-title" >${contB} clientes</b>`
        Clientes.innerHTML = strHtml
    }
    renderC()


   /* const c = document.getElementById("chartActivity")
    const renderCargos = async () => {
        console.log("=OLA")


        const response = await fetch(`http://localhost:5050/users`)
        const users = await response.json()
        const user = users.data
        let i = 1
        var contC = 0
        var contB = 0
        var contM = 0
        for (const u of user) {
            //console.log(u.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52)
            if (u.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52 == "Cliente") {
                contC++
            }
            if (u.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52 == "Gestor de Bilhetes") {
                contB++
            }
            if (u.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52 == "Gestor de Materiais") {
                contM++
            }

        }
        i++
        //console.log(contB)
        var data = {
            labels: ['Gestor de Materiais', 'Gestor de Bilhetes', 'Clientes'],
            series: [
                [contM, contB, contC]
            ]
        };

        Chartist.Bar('#chartActivity', data, options, responsiveOptions);
    }
    renderCargos()
*/

    const renderBilhetes = async () => {
        const response = await fetch(`http://localhost:5050/products`)
        const products = await response.json()

        let i = 1
var label = []
var serie = []
        for (product of products) {
                if (product.type == 3) {
                   //label += product.name,
                   label.push(product.name)
                   serie.push(product.stock)
                }
        

    }
    console.log(label)
    console.log(serie)
    const lab = ["'a'", "'b'", "'c'"]
    i++
    //console.log(contB)
    var data = {
        labels: [label],
        series: [serie]
    };


    Chartist.Bar('#chartActivity1', data, options, responsiveOptions);
}
renderBilhetes()

const renderMat = async () => {
    const response = await fetch(`http://localhost:5050/products`)
    const products = await response.json()

    let i = 1
var label = []
var serie = []
    for (product of products) {
            if (product.type == 1) {
               //label += product.name,
               label.push(product.name)
               serie.push(product.stock)
            }
    

}
console.log(label)
console.log(serie)
const lab = ["'a'", "'b'", "'c'"]
i++
//console.log(contB)
var data = {
    labels: [label],
    series: [serie]
};


Chartist.Bar('#chartActivity', data, options, responsiveOptions);
}
renderMat()

const Insc = document.getElementById("receitaB")

    const renderInsc = async () => {
        let strHtml = `
        <p style="color: black" class="card-category">Receita de Bilhetes</p>`
        var t
        var t2 = 0
        const productsId = []
        const productsType = []
        const productPrice = []
        const responseQ = await fetch(`http://localhost:5050/products`)
        const mats = await responseQ.json()
        let cont = 0
        for (const mat of mats) {
            productsId[cont] = mat.product_id
            productsType[cont] = mat.type
            productPrice[cont] = mat.price
            cont++
        }
        //console.log(productsType)
        const response = await fetch(`http://localhost:5050/stockMovs`)
        const movs = await response.json()
        let j = 0

        for (const material of movs) {
            //const responseQ = await fetch(`http://localhost:5050/products`)
            //const mats = await responseQ.json()
            //let i = 1
            //for (const mat of mats) {
            for (i = 0; i < productsId.length; i++) {
                //console.log(productsId[i])
                //console.log(material.product_id)
                //console.log(material.qty)
                if (productsId[i] == material.product_id && productsType[i] == 3 && material.notes !== "") {

                    let qt = String(material.qty).includes("-")
                    //console.log(qt)
                    if (qt) {

                        var t = Math.abs(material.qty * parseFloat(productPrice[i] * 1.23).toFixed(2))
                        t2 += t
                        //console.log(t)

                    }
                    var total = t + t
                    //i++
                }
            }
            //}
            j++
        }
        console.log(parseFloat(t2).toFixed(2))
        strHtml += `

            <b class="card-title" >${parseFloat(t2).toFixed(2)}€</b>`
        Insc.innerHTML = strHtml
    }
    renderInsc()

    const rec = document.getElementById("receitaM")

    const renderMateriais = async () => {
        let strHtml = `
        <p style="color: black" class="card-category">Receita de Materiais</p>`
        var t
        var t2 = 0
        const productsId = []
        const productsType = []
        const productPrice = []
        
        const responseQ = await fetch(`http://localhost:5050/products`)
        const mats = await responseQ.json()
        let cont = 0
        for (const mat of mats) {
            productsId[cont] = mat.product_id
            productsType[cont] = mat.type
            productPrice[cont] = mat.price
            cont++
        }
        //console.log(productsType)
        const response = await fetch(`http://localhost:5050/stockMovs`)
        const movs = await response.json()
        let j = 0

        for (const material of movs) {
            //const responseQ = await fetch(`http://localhost:5050/products`)
            //const mats = await responseQ.json()
            //let i = 1
            //for (const mat of mats) {
            for (i = 0; i < productsId.length; i++) {
                //console.log(productsId[i])
                //console.log(material.product_id)
                //console.log(material.qty)
                if (productsId[i] == material.product_id && productsType[i] == 1 && material.notes !== "") {

                    let qt = String(material.qty).includes("-")
                    //console.log(qt)
                    if (qt) {

                        var t = Math.abs(material.qty * parseFloat(productPrice[i] * 1.23).toFixed(2))
                        t2 += t
                        //console.log(t)

                    }
                    var total = t + t
                    //i++
                }
            }
            //}
            j++
        }
        console.log(parseFloat(t2).toFixed(2))
        strHtml += `

            <b class="card-title" >${parseFloat(t2).toFixed(2)}€</b>`
        rec.innerHTML = strHtml
    }
    renderMateriais()
}