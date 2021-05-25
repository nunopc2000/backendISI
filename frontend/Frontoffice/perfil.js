window.onload = () => {

    const emailStorage = localStorage.id

    const nome = document.getElementById("nome")
    const email = document.getElementById("email")
    const tlm = document.getElementById("tlm")
    const contribuinte = document.getElementById("contribuinte")
    const tblCompras = document.getElementById("tblCompras")
    const renderUser = async () => {

        let str = `
        <thead>
        <tr>
        <th class='text-center'>ID</th>
        <th class='text-center'>QR Code</th>
        <th class='text-center'>Data</th>
        <th class='text-center'>Preço</th>
        <th class='text-center'>Quantidade</th>
        <th class='text-center'>Reservado</th>
        <th class='text-center'>Entregue</th>
        <th class='text-center'>Devolvido</th>
        </tr>
        </thead>
        <tbody>`

        const response = await fetch(`http://localhost:5050/stockMovs`)
        const movs = await response.json()
        //const g = gestores.data
        //console.log(movs[0])

       /* for(i=0;i<materiais.lenght; i++){
            materiais[i]
        }*/

        let i = 1
        for (const mov of movs) {
            const e = String(mov.notes).split(":")
            const email = e[0]
            const flag = e[1]
            console.log(flag)
           // if(flag == 0){
            if(email == localStorage.id){
                if(flag == 4){
                    const qtd = mov.qty
                    const q = String(qtd).substring(1)
                    const d = String(mov.movement_date).split("T")
                    const data = d[0]
                    const h = d[1].split("+")
                    const horas = h[0]
                    console.log(data+" "+horas)
                    console.log(mov.product_stock_id)
                    const n = mov.product_stock_id+"+"+mov.notes
                    
                    console.log("----------")
                    console.log(n)
                    str += `
            <tr >
               
                <td class='text-center' >${mov.product_stock_id}</td>
                <td class='text-center'><img src="https://api.qrserver.com/v1/create-qr-code/?data=${n}&amp;size=100x100" alt="" title="" /></td>
                <td class='text-center'>${data+" "+horas}</td>
                <td class='text-center'>${mov.product.name}</td>
                <td class='text-center'>${q}</td>
                <td class='text-center'>Sim</td>
                <td class='text-center'>Não</td>
                <td class='text-center'>N/A</td>
            </tr>
        `
                } else
                if(flag == 3){
                const qtd = mov.qty
                const q = String(qtd).substring(1)
                const d = String(mov.movement_date).split("T")
                const data = d[0]
                const h = d[1].split("+")
                const horas = h[0]
                console.log(data+" "+horas)
                console.log(mov.product_stock_id)
                const n = mov.product_stock_id+"+"+mov.notes
                
                console.log("----------")
                console.log(n)
                str += `
        <tr >
           
            <td class='text-center' >${mov.product_stock_id}</td>
            <td class='text-center'>N/A</td>
            <td class='text-center'>${data+" "+horas}</td>
            <td class='text-center'>${mov.product.name}</td>
            <td class='text-center'>${q}</td>
            <td class='text-center'>Sim</td>
            <td class='text-center'>Sim</td>
            <td class='text-center'>N/A</td>
        </tr>
    `
            } else if(flag == 0){
                const qtd = mov.qty
                const q = String(qtd).substring(1)
                const d = String(mov.movement_date).split("T")
                const data = d[0]
                const h = d[1].split("+")
                const horas = h[0]
                console.log(data+" "+horas)
                const n = mov.product_stock_id+"+"+email
                console.log("----------")
                
                str += `
        <tr >
           
            <td class='text-center'>${mov.product_stock_id}</td>
            <td class='text-center'><img src="https://api.qrserver.com/v1/create-qr-code/?data=${n}&amp;size=100x100" alt="" title="" /></td>
            <td class='text-center'>${data+" "+horas}</td>
            <td class='text-center'>${mov.product.name}</td>
            <td class='text-center'>${q}</td>
            <td class='text-center'>Sim</td>
            <td class='text-center'>Não</td>
            <td class='text-center'>Não</td>
        </tr>
    `
            }else if(flag == 1){
                const qtd = mov.qty
                const q = String(qtd).substring(1)
                const d = String(mov.movement_date).split("T")
                const data = d[0]
                const h = d[1].split("+")
                const horas = h[0]
                console.log(data+" "+horas)
                const n = mov.product_stock_id+"+"+email
                str += `
        <tr >
           
            <td class='text-center'>${mov.product_stock_id}</td>
            <td class='text-center'><img src="https://api.qrserver.com/v1/create-qr-code/?data=${n}&amp;size=100x100" alt="" title="" /></td>
            <td class='text-center'>${data+" "+horas}</td>
            <td class='text-center'>${mov.product.name}</td>
            <td class='text-center'>${q}</td>
            <td class='text-center'>Sim</td>
            <td class='text-center'>Sim</td>
            <td class='text-center'>Não</td>
        </tr>
    `
            }else if(flag == 2){
                const qtd = mov.qty
                const q = String(qtd).substring(1)
                const d = String(mov.movement_date).split("T")
                const data = d[0]
                const h = d[1].split("+")
                const horas = h[0]
                console.log(data+" "+horas)
                const n = mov.product_stock_id+"+"+email
                str += `
        <tr >
           
            <td class='text-center'>${mov.product_stock_id}</td>
            <td class='text-center'>N/A</td>
            <td class='text-center'>${data+" "+horas}</td>
            <td class='text-center'>${mov.product.name}</td>
            <td class='text-center'>${q}</td>
            <td class='text-center'>Sim</td>
            <td class='text-center'>Sim</td>
            <td class='text-center'>Sim</td>
        </tr>
    `
            }
            i++
            }
           /* } else if(flag == 1){
                if(email == localStorage.id){
                    const qtd = mov.qty
                    console.log(qtd)
                    const q = String(qtd).substring(1)
                    console.log(q)
                    const d = String(mov.movement_date).split("T")
                    const data = d[0]
                    const h = d[1].split("+")
                    const horas = h[0]
                    console.log(data+" "+horas)
                    str += `
            <tr >
               
                <td class='text-center'>${mov.product_stock_id}</td>
                <td class='text-center'>${data+" "+horas}</td>
                <td class='text-center'>${mov.product.name}</td>
                <td class='text-center'>${q}</td>
                <td class='text-center'>Sim</td>
                <td class='text-center'>Sim</td>
                <td class='text-center'>Não</td>
            </tr>
        `
                i++
                }
                }*/
        }
        str += "</tbody>"
        tblCompras.innerHTML = str


    response1 = await fetch(`http://localhost:5050/userByEmail/${emailStorage}`)
    const pa = await response1.json()
    const p = pa.data.items
    //console.log(p)
    for (i = 0; i < p.length; i++) {
        //console.log(a[i].item.custom_fields)
        var no = p[i].item.name
        var cf = p[i].item.emails
        var tl = p[i].item.phones
        var nif = p[i].item.custom_fields[2]
        //console.log(no)
    }
    let strHtml = `
    <text class="form-control valid" name="name" id="email" type="text" placeholder="Email">${cf}
    `
    email.innerHTML=strHtml

    let n =`<text class="form-control valid" name="name" id="nome" type="text" placeholder="Nome">${no}`
    nome.innerHTML=n

    let t =`<text class="form-control valid" name="name" id="tlm" type="text" placeholder="Telemóvel">${tl}`
    tlm.innerHTML=t

    let a =`<text class="form-control valid" name="name" id="nif" type="text" placeholder="NIF">${nif}`
    contribuinte.innerHTML=a
    }
    renderUser()
}