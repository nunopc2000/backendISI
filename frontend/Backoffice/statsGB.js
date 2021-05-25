window.onload = () => {
    const tblBilhete = document.getElementById("tblBilhete")
    //trata da tabela

    const renderMateriais = async () => {
        let strHtml = `
        <thead>
        <tr>
        <th class='text-center'>ID</th>
        <th class='text-center'>Tipo de Bilhete</th>
        <th class='text-center'>Data</th>
        <th class='text-center'>Quantidade</th>
        <th class='text-center'>Preço</th>
        <th class='text-center'>Cliente</th>
        </tr>
        </thead>
        <tbody>`

        const prodID = []
        const prodType = []
        const prodPrice = []


        const response2 = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
        const mats = await response2.json()
        let a = 1
        for (const mat of mats) {
            prodID[a] = mat.product_id
            prodPrice[a] = parseFloat(mat.price*1.23).toFixed(2)
            prodType[a] = mat.type
            a++
        }
        console.log(prodType)

        const response3 = await fetch(`https://backend-easyfestival.herokuapp.com/stockMovs`)
        const movs = await response3.json()
        let j = 0

        for (const material of movs) {
            for (i = 0; i < prodID.length; i++) {
                if (prodID[i] == material.product_id && prodType[i] == 3) {
                    const d = String(material.movement_date).split("T")
                    const data = d[0]
                    const h = d[1].split("+")
                    const horas = h[0]
                    let qt = String(material.qty).includes("-")
                    //console.log(qt)
                    if (qt) {
                        strHtml += `
        <tr >
           
            <td class='text-center'>${material.product_id}</td>
            <td class='text-center'>${material.product.name}</td>
            <td class='text-center'>${data + " " + horas}</td>
            <td class='text-center'>${String(material.qty).substring(1)}</td>
            <td class='text-center'>${Math.abs(material.qty)*prodPrice[i]}</td>
            `

                        const em = material.notes.split(":")
                        const email = em[0]

                        responseEM = await fetch(`https://backend-easyfestival.herokuapp.com/userByEmail/${email}`)
                        const people = await responseEM.json()

                        const person = people.data

                        const per = person.items[0].item


                        strHtml += `
            <td class='text-center'>${per.name}</td>
            
        </tr>
    `
                    }
                    //i++
                }
            }
            //}
            j++
        }
        
        

        strHtml += "</tbody>"
        tblBilhete.innerHTML = strHtml


    }


    renderMateriais()

    const Insc = document.getElementById("Insc")

    const renderInsc = async () => {
        let strHtml = `
        <p style="color: black" class="card-category">Valor de bilhetes comprados</p>`
        var t
        var t2 = 0
        const productsId = []
        const productsType = []
        const productPrice = []
        const responseQ = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
        const mats = await responseQ.json()
        let cont = 0
        for (const mat of mats) {
            productsId[cont] = mat.product_id
            productsType[cont] = mat.type
            productPrice[cont] = mat.price
            cont++
        }
        //console.log(productsType)
        const response = await fetch(`https://backend-easyfestival.herokuapp.com/stockMovs`)
        const movs = await response.json()
        let j = 0

        for (const material of movs) {
            //const responseQ = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
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


    const tB = document.getElementById("totalB")

    const renderTotal = async () => {
        let strHtml = `
        <p style="color: black" class="card-category">Total de bilhetes comprados</p>`
        var t
        var t2 = 0
        const productsId = []
        const productsType = []
        const productPrice = []
        const responseQ = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
        const mats = await responseQ.json()
        let cont = 0
        for (const mat of mats) {
            productsId[cont] = mat.product_id
            productsType[cont] = mat.type
            productPrice[cont] = mat.price
            cont++
        }
        //console.log(productsType)
        const response = await fetch(`https://backend-easyfestival.herokuapp.com/stockMovs`)
        const movs = await response.json()
        let j = 0

        for (const material of movs) {
            //const responseQ = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
            //const mats = await responseQ.json()
            //let i = 1
            //for (const mat of mats) {
            for (i = 0; i < productsId.length; i++) {
                //console.log(productsId[i])
                //console.log(material.product_id)
                //console.log(material.qty)
                if (productsId[i] == material.product_id && productsType[i] == 3) {

                    let qt = String(material.qty).includes("-")
                    //console.log(qt)
                    if (qt) {

                        var t = Math.abs(material.qty)
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

            <b class="card-title" >${t2} bilhetes</b>`
            tB.innerHTML = strHtml
    }
    renderTotal()

}