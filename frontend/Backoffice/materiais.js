window.onload = () => {
    const tblMaterials = document.getElementById("tblMaterials")
    //trata da tabela
    const renderMateriais = async () => {
        let strHtml = `
        <thead>
        <tr>
        <th class='text-center'>ID</th>
        <th class='text-center'>Tipo de Material</th>
        <th class='text-center'>Preço</th>
        <th class='text-center'>Stock</th>
        
        <th class='text-center'>Editar/Eliminar</th>
        </tr>
        </thead>
        <tbody>`

        const response = await fetch(`https://backend-easyfestival.herokuapp.com/products`)
        const materiais = await response.json()
        //const g = gestores.data
        console.log(materiais[0])

        /* for(i=0;i<materiais.lenght; i++){
             materiais[i]
         }*/

        let i = 1
        for (const material of materiais) {
            if (material.type == 1) {
                strHtml += `
        <tr >
           
            <td class='text-center'>${material.product_id}</td>
            <td class='text-center'>${material.name}</td>
            <td class='text-center'>${parseFloat(material.price * 1.23).toFixed(2)}</td>
            <td class='text-center'>${material.stock}</td>
            <td class='text-center'>
            <i id='${material.product_id}' title="Editar" class='btn btn-simple fa fa-edit editar' style='color:white'></i> 
            <i id='${material.product_id}' title="Remover" class='btn btn-simple fa fa-trash eliminar' style='color:white'></i>
        </td>
        </tr>
    `
                i++
            }
        }
        strHtml += "</tbody>"
        tblMaterials.innerHTML = strHtml

        const btnDelete = document.getElementsByClassName("eliminar")
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", () => {
                swal({
                    title: 'Tem a certeza que pretende eliminar este material?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#086A87',
                    cancelButtonColor: '#7e7e7e',
                    cancelButtonText: 'Não',
                    confirmButtonText: 'Sim'
                }).then(async (result) => {
                    if (result.value) {
                        let product_id = btnDelete[i].getAttribute("id")
                        console.log("68 Linha: " + product_id)
                        const json = {
                            product_id: product_id
                        }
                        try {
                            const responseD = await fetch(`https://backend-easyfestival.herokuapp.com/deleteProduct/${product_id}`, {
                                method: "DELETE"
                            })
                            const isRemoved = await responseD.json()
                            swal({ type: 'success', title: 'Material removido', text: 'Ação concluída com sucesso' })
                            renderMateriais()
                            console.log("antes catch")
                        } catch (err) {
                            console.log("catch")
                            swal({ type: 'error', title: 'Remoção de Material', text: err })
                        }

                    }
                })
            })
        }


        const btnEditar = document.getElementsByClassName("editar")
        for (let i = 0; i < btnEditar.length; i++) {
            btnEditar[i].addEventListener("click", () => {
                swal({
                    title: 'Editar material!',
                    html: '<p style="color: black; "> Tipo de material </p>' +
                        '<input id="tipo" class="swal2-input">' +
                        '<p style="color: black; "> Preço do material </p>' +
                        '<input id="price" class="swal2-input">' +
                        '<p style="color: black; "> Quantidade de material </p>' +
                        '<input id="qtd" class="swal2-input">',
                    confirmButtonText: 'Guardar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#086a87',
                    cancelButtonColor: '#7e7e7e',
                    showCancelButton: true,
                    showConfirmButton: true,
                    //confirmButtonText: 'Sim'
                }).then(async (result) => {
                    if (result.value) {
                        let product_id = btnDelete[i].getAttribute("id")
                        console.log(product_id)
                        const tipo = document.getElementById("tipo").value
                        const preco = document.getElementById("price").value
                        //console.log(preco)
                        const qtd = document.getElementById("qtd").value
                        console.log(qtd)
                        console.log(quantAnterior)
                        var quantidade = qtd - quantAnterior
                        console.log("QTD FINAL"+quantidade)
                        const json = {
                            product_id: product_id,
                            nome: tipo,
                            preco: preco,
                            stock: quantidade
                        }

                        const movStock = {
                            qty: quantidade,
                            product_id: product_id
                        }
                        //console.log(json)
                        //const a = true
                        
                        try {
                            responseEd = await fetch(`https://backend-easyfestival.herokuapp.com/updateProduct`, {
                                headers: {
                                    "Content-Type": "application/json; charset=utf-8",
                                    "Access-Control-Allow-Origin": "*"
                                },
                                method: "PUT",
                                body: JSON.stringify(json)
                                
                            })
                            
                            response1 = await fetch(`https://backend-easyfestival.herokuapp.com/editProduct`, {
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            method: "POST",
                            body: JSON.stringify(movStock)
                    
                        })

                        renderMateriais()
                       
                            swal({ type: 'success', title: 'Material editado', text: 'Ação concluída com sucesso' })
                            renderMateriais()
                            //console.log("antes catch")
                        } catch (err) {
                            //console.log("catch")
                            swal({ type: 'error', title: 'Edição de Material', text: err })
                        }

                    }
                })

                for (const material of materiais) {
                    let p_id = btnDelete[i].getAttribute("id")
                        
                        if(material.product_id==p_id){
                            var quantAnterior = material.stock
                            document.getElementById("tipo").value = material.name
                            document.getElementById("price").value = parseFloat(material.price * 1.23).toFixed(2)
                            document.getElementById("qtd").value = material.stock
                        }
    
                    }
            })
        }

    }

    renderMateriais()

}