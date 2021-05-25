window.onload = () => {

    const tblGestores = document.getElementById("tblGestores")
    const addGestor = document.getElementById("addGestor")

    addGestor.addEventListener("submit", async (event) => {
        console.log("OLA")
        event.preventDefault()
        const id = document.getElementById("id").value
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const password = document.getElementById("password").value
        const nif = document.getElementById("nif").value
        const opc = document.getElementsByName("opc")
        const user = {
            name: name,
            email: email,
            phone: phone,
            nif: nif,
            password: password
        }
        console.log(user)

        for (i = 0; i < opc.length; i++) {
            if (opc[i].checked) {
                var cargo = opc[i].value
            }
        }


        response = await fetch(`https://www.nif.pt/?json=1&q=${nif}&key=5b484eb38c08d6026b83e0f02410d63d`)
        const pa = await response.json()
        if (pa.is_nif == true) {
            if (cargo == "Gestor de Bilhetes") {
                response = await fetch(`https://backend-easyfestival.herokuapp.com/addTicketManager`, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(user)
                })
                swal({ type: 'success', title: 'Gestor adicionado', text: 'Ação concluída com sucesso' })

            } else {
                response = await fetch(`https://backend-easyfestival.herokuapp.com/addMaterialManager`, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(user)
                })
                swal({ type: 'success', title: 'Gestor adicionado', text: 'Ação concluída com sucesso' })
            }
        } else {
            swal({ type: 'error', title: 'Nif inválido', text: 'O registo não foi concluído' })
        }

        renderGestores()
    })


    //trata da tabela
    const renderGestores = async () => {

        let strHtml = `
    <thead>
        <tr>
        <th class='text-center'>ID</th>
        <th class='text-center'>Tipo de Gestor</th>
        <th class='text-center'>Nome</th>
        <th class='text-center'>Eliminar</th>
        </tr>
        </thead>
        <tbody>
    `
        const response = await fetch(`https://backend-easyfestival.herokuapp.com/users`)
        const gestores = await response.json()
        const g = gestores.data

        let i = 1
        for (const gestor of g) {
            if (gestor.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52 == "Gestor de Bilhetes" || gestor.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52 == "Gestor de Materiais") {
                strHtml += `
        <tr>
           
            <td class='text-center'>${gestor.id}</td>
            <td class='text-center'>${gestor.a21ac1a7bda75dc0c74f12ec6edc2de4963c6a52}</td>
            <td class='text-center'>${gestor.name}</td>
            <td class='text-center'>
            <i id='${gestor.id}' title="Editar" class='btn btn-simple fa fa-edit editar' style='color:white'></i> 
            <i id='${gestor.id}' title="Remover" class='btn btn-simple fa fa-trash eliminar' style='color:white'></i>
        </td>
        </tr>
    `
                i++

            }
        }
        strHtml += "</tbody>"
        tblGestores.innerHTML = strHtml

        //eliminar
        const btnDelete = document.getElementsByClassName("eliminar")
        for (let i = 0; i < btnDelete.length; i++) {
            btnDelete[i].addEventListener("click", () => {
                swal({
                    title: 'Tem a certeza que pretende eliminar este gestor?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#086A87',
                    cancelButtonColor: '#7e7e7e',
                    cancelButtonText: 'Não',
                    confirmButtonText: 'Sim'
                }).then(async (result) => {
                    if (result.value) {
                        let gestorID = btnDelete[i].getAttribute("id")
                        try {
                            const response = await fetch(`https://backend-easyfestival.herokuapp.com/deleteUser/${gestorID}`, {
                                method: "DELETE"
                            })
                            swal({ type: 'success', title: 'Gestor removido', text: 'Ação concluída com sucesso' })
                            renderGestores()
                            console.log("antes catch")
                        } catch (err) {
                            console.log("catch")
                            swal({ type: 'error', title: 'Remoção de Gestor', text: err })
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
                        '<input type="radio" name="opc" value="Gestor de Bilhetes" checked> Bilhetes      ' +
                        '<input type="radio" name="opc" value="Gestor de Materiais"> Materiais<br>' +
                        '<br><p style="color: black; "> Nome </p>' +
                        '<input id="nome" ><br>' +
                        '<br><p style="color: black; "> Email </p>' +
                        '<input id="emailq"><br>' +
                        '<br><p style="color: black; "> Telemóvel </p>' +
                        '<input id="tlm" ><br>' +
                        '<br><p style="color: black; "> NIF </p>' +
                        '<input id="nifq" >',
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
                        const nome = document.getElementById("nome").value
                        const email = document.getElementById("emailq").value
                        const tlm = document.getElementById("tlm").value
                        const nif = document.getElementById("nifq").value
                        const opc = document.getElementsByName("opc")
                        for (i = 0; i < opc.length; i++) {
                            if (opc[i].checked) {
                                var cargo1 = opc[i].value
                            }
                        }
                        const json = {

                            name: nome,
                            email: email,
                            phone: tlm,
                            nif: nif,
                            cargo: cargo1
                        }
                        console.log(json)
                        response2 = await fetch(`https://www.nif.pt/?json=1&q=${nif}&key=5b484eb38c08d6026b83e0f02410d63d`)
                        const pa = await response2.json()
                        console.log(pa.is_nif)
                        if (pa.is_nif == true) {
                        try {
                            responseEd = await fetch(`https://backend-easyfestival.herokuapp.com/putData/${id}`, {
                                headers: {
                                    "Content-Type": "application/json; charset=utf-8",
                                    "Access-Control-Allow-Origin": "*"
                                },
                                method: "PUT",
                                body: JSON.stringify(json)

                            })

                            renderGestores()

                            swal({ type: 'success', title: 'Gestor editado', text: 'Ação concluída com sucesso' })
                            renderGestores()
                            //console.log("antes catch")
                        } catch (err) {
                            //console.log("catch")
                            swal({ type: 'error', title: 'Edição de Gestor', text: err })
                        }
                    }else {
                        swal({ type: 'error', title: 'Nif inválido', text: 'O registo não foi concluído' })
                    }

                    }
                })

                for (const gestor of g) {
                    let p_id = btnDelete[i].getAttribute("id")

                    if (gestor.id == p_id) {
                        console.log(gestor.email[0].value)
                        console.log(gestor.c5fb458f14b5ac7bdcb561f3120306cd18eb31f4)
                        document.getElementById("nome").value = gestor.name
                        document.getElementById("emailq").value = gestor.email[0].value
                        document.getElementById("tlm").value = gestor.phone[0].value
                        document.getElementById("nifq").value = gestor.c5fb458f14b5ac7bdcb561f3120306cd18eb31f4
                        
                    }

                }
            })
        }

        /*const btnEdit = document.getElementsByClassName("editar")
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", () => {
                console.log("aa")
                for (const gestor of g) {
                    if (gestor.id == btnEdit[i].getAttribute("id")) {
                        document.getElementById("id").value = gestor.id
                        document.getElementById("name").value = gestor.name
                        document.getElementById("email").value = gestor.email
                        document.getElementById("phone").value = gestor.phone
                        document.getElementById("nif").value = gestor.c5fb458f14b5ac7bdcb561f3120306cd18eb31f4

                    }
                }
            })
        }*/



    }

    renderGestores()

}