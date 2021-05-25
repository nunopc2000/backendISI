window.onload = () => {

    const tblPlaces = document.getElementById("tblPlaces")
    const place = document.getElementById("addPlace")

    place.addEventListener("submit", async (event) => {
        event.preventDefault()
        const tipo = document.getElementById("tipo").value
        const name = document.getElementById("nome").value
        const latitude = document.getElementById("latitude").value
        const longitude = document.getElementById("longitude").value
        const user = {
            tipo: tipo,
            name: name,
            latitude: latitude,
            longitude: longitude,
        }
        console.log(user)

        response = await fetch(`http://localhost:5050/addPlace`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(user)
        })
        place.reset()
        Swal.fire(
            'Estabelecimento adicionado com sucesso!',
            'Os dados foram guardados corretamente',
            'success'
        )


        renderPlaces()


    })

    const renderPlaces = async () => {
        let strHtml = `
        <thead>
            <tr>
            <th class='text-center'>ID</th>
            <th class='text-center'>Nome</th>
            <th class='text-center'>Tipo de Estabelecimento</th>
            <th class='text-center'>Longitude</th>
            <th class='text-center'>Latitude</th>
            <th class='text-center'>Editar/Eliminar</th>
            </tr>
            </thead>
        <tbody>`

        const response = await fetch(`http://localhost:5050/places`)
        const p = await response.json()
        const places = p.data
        // const lat = "7abcfc2737c4658269489646f1573be349ecc40a"
        let i = 1
        for (const place of places) {
            //console.log(p.data)
            strHtml += `
        <tr>
           
            <td class='text-center'>${place.id}</td>
            <td class='text-center'>${place.name}</td>
            <td class='text-center'>${place["28d2372914521a41b8302b06aa14d81335911389"]}</td>
            <td class='text-center'>${place["6f41379348685c872fa808a8410012847366c214"]}</td>
            <td class='text-center'>${place["7abcfc2737c4658269489646f1573be349ecc40a"]}</td>
            <td class='text-center'>
            <i id='${place.id}' title="Editar" class='btn btn-simple fa fa-edit editar' style='color:white'></i> 
            <i id='${place.id}' title="Remover" class='btn btn-simple fa fa-trash eliminar' style='color:white'></i>
        </td>
        </tr>
    `
            i++

        }
        strHtml += "</tbody>"
        tblPlaces.innerHTML = strHtml

        //eliminar
        const btnDelete = document.getElementsByClassName("eliminar")
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", () => {
                swal({
                    title: 'Tem a certeza que pretende eliminar este estabelecimento?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#086A87',
                    cancelButtonColor: '#7e7e7e',
                    cancelButtonText: 'Não',
                    confirmButtonText: 'Sim'
                }).then(async (result) => {
                    if (result.value) {
                        let placeID = btnDelete[i].getAttribute("id")
                        console.log(placeID)
                        try {
                            const response = await fetch(`http://localhost:5050/deletePlace/${placeID}`, {
                                method: "DELETE"
                            })
                            const isRemoved = await response.json()
                            swal({ type: 'success', title: 'Estabelecimento removido', text: 'Ação concluída com sucesso' })
                            renderPlaces()
                            console.log("antes catch")
                        } catch (err) {
                            console.log("catch")
                            swal({ type: 'error', title: 'Remoção de Estabelecimento', text: err })
                        }

                    }
                })
            })
        }

        const btnEditar = document.getElementsByClassName("editar")
        for (let i = 0; i < btnEditar.length; i++) {
            btnEditar[i].addEventListener("click", () => {
                swal({
                    title: 'Editar Gestor',
                    html:
                        '<p style="color: black;">Que tipo de gestor deseja adicionar?</p>' +
                        '<select id="tipoT">'+
                        '<option >WC</option>'+
                        '<option >Aluguer de material</option>'+
                        '<option >Palco principal</option>'+
                        '<option >Palco secundário</option>'+
                        '<option >Restauração</option>'+
                        '<option >Bancas Loiça</option>'+
                        '</select><br>' +
                        '<br><p style="color: black; "> Nome </p>' +
                        '<input id="nomeE" ><br>' +
                        '<br><p style="color: black; "> Latitude </p>' +
                        '<input id="lat"><br>' +
                        '<br><p style="color: black; "> Longitude </p>' +
                        '<input id="long" ><br>',
                       
                    confirmButtonText: 'Guardar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#086a87',
                    cancelButtonColor: '#7e7e7e',
                    showCancelButton: true,
                    showConfirmButton: true,
                    //confirmButtonText: 'Sim'
                }).then(async (result) => {
                    if (result.value) {
                        let id = btnDelete[i].getAttribute("id")
                        console.log(id)
                        const nome = document.getElementById("nomeE").value
                        const tipo = document.getElementById("tipoT").value
                        const latitude = document.getElementById("lat").value
                        const longitude = document.getElementById("long").value
                        
                        const json = {

                            name: nome,
                            tipo: tipo,
                            latitude: latitude,
                            longitude: longitude,
                        }
                        console.log(json)
                       
                        try {
                            responseEd = await fetch(`http://localhost:5050/putPlace/${id}`, {
                                headers: {
                                    "Content-Type": "application/json; charset=utf-8",
                                    "Access-Control-Allow-Origin": "*"
                                },
                                method: "PUT",
                                body: JSON.stringify(json)

                            })

                            renderPlaces()

                            swal({ type: 'success', title: 'Estabelecimento editado', text: 'Ação concluída com sucesso' })
                            renderPlaces()
                            //console.log("antes catch")
                        } catch (err) {
                            //console.log("catch")
                            swal({ type: 'error', title: 'Edição de Estabelecimento', text: err })
                        }
                    

                    }
                })

                for (const place of places) {
                    let p_id = btnDelete[i].getAttribute("id")

                    if (place.id == p_id) {
                        document.getElementById("nomeE").value = place.name
                        document.getElementById("long").value = place["6f41379348685c872fa808a8410012847366c214"]
                        document.getElementById("tipo").value = place["28d2372914521a41b8302b06aa14d81335911389"]
                        document.getElementById("lat").value = place["7abcfc2737c4658269489646f1573be349ecc40a"]
                        
                    }

                }
            })
        }


    }
    renderPlaces()
}