window.onload = () => {

    const login = document.getElementById("test-form")
    const registo = document.getElementById("test-form2")

    login.addEventListener("submit", async (event) => {
        console.log("login")
        event.preventDefault()
        const email = document.getElementById("emailL").value
        const password = document.getElementById("passwordL").value

        response = await fetch(`https://backend-easyfestival.herokuapp.com/userByEmail/${email}`)
        const people = await response.json()
        console.log("!!!!!!!!!!!!!!!!!!!!!" + people)
        const p = people.data
        //console.log(p)
        const a = p.items
        for (i = 0; i < a.length; i++) {
            //console.log(a[i].item.custom_fields)
            const cf = a[i].item.custom_fields
            var pass = cf[0]
            var cargo = cf[1]
        }
        /*console.log("fora: " + cargo)
        console.log("fora: " + pass)
        console.log("FIZ O FETCH")*/
        response = await fetch(`https://backend-easyfestival.herokuapp.com/login/${email}/${password}`)
        const pa = await response.json()
        console.log("RESPOSTA NO FRONT: " + pa)
        /*if(pa==true){
            console.log("ENTREI")
        }else{
            console.log("fuckkkkk")
            swal({ type: 'error', title: 'Login inválido', text: 'Dados incorretos' })
        }*/
        if (pa == true) {
            localStorage.clear()
            localStorage.id = email
            if (cargo == "Cliente") {
                window.location.href = "index_cliente.html";
            } else if (cargo == "Gestor de Bilhetes") {
                window.location.replace("bilhetes.html")
            } else if (cargo == "Gestor de Materiais") {
                window.location.replace("materiais.html")
            } else if (cargo == "Admin") {
                window.location.replace("estatisticas.html")
            }
        } else {
            swal({ type: 'error', title: 'Login inválido', text: 'Dados incorretos' })
        }

    })

    registo.addEventListener("submit", async (event) => {

        event.preventDefault()
        const name = document.getElementById("nome").value
        const email = document.getElementById("emailR").value
        const telemovel = document.getElementById("telemovel").value
        const nif = document.getElementById("nif").value
        const password = document.getElementById("passwordR1").value
        const password2 = document.getElementById("passwordR2").value
        const user = {
            name: name,
            email: email,
            phone: telemovel,
            nif: nif,
            password: password
        }
        const userIX = {
            nome: name,
            nif: nif,
            email: email,
            phone: telemovel,

        }
        console.log(user)
        response2 = await fetch(`http://www.nif.pt/?json=1&q=${nif}&key=5b484eb38c08d6026b83e0f02410d63d`)
        const pa = await response2.json()
        console.log(pa.is_nif)


        //if (pa.is_nif == true) {
            if (password === password2) {
                response1 = await fetch(`https://backend-easyfestival.herokuapp.com/addUser`, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(user)

                })


                responseIX = await fetch(`https://backend-easyfestival.herokuapp.com/createContact`, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(userIX)

                })

                registo.reset()
                Swal.fire(
                    'Criado com sucesso!',
                    'Os dados foram guardados corretamente',
                    'success'
                )
            }/*
        } else {
            swal({ type: 'error', title: 'Nif inválido', text: 'O registo não foi concluído' })
        }*/
    })


}
