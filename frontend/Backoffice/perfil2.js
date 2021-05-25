window.onload = () => {

    const emailStorage = localStorage.id

    const nome = document.getElementById("nome")
    const email = document.getElementById("email")
    const tlm = document.getElementById("tlm")
    const contribuinte = document.getElementById("contribuinte")
    const form = document.getElementById("contactForm")
    const passAntiga = document.getElementById("passAntiga")
    const passNova = document.getElementById("passNova")

    const renderUser = async () => {
        response = await fetch(`https://backend-easyfestival.herokuapp.com/userByEmail/${emailStorage}`)
        const pa = await response.json()
        const p = pa.data.items
        console.log(p)
        for (i = 0; i < p.length; i++) {
            //console.log(a[i].item.custom_fields)
            var no = p[i].item.name
            var cf = p[i].item.emails
            var tl = p[i].item.phones
            var nif = p[i].item.custom_fields[2]
            var passAtual = p[i].item.custom_fields[0]
            console.log(passAtual)
        }
        
        let strHtml = `
    <input class="form-control valid" name="name" id="email" type="text" placeholder="${cf}">
    `
        email.innerHTML = strHtml

        let n = `<text class="form-control valid" name="name" id="nome" type="text" placeholder="Nome">${no}`
        nome.innerHTML = n

        let t = `<text class="form-control valid" name="name" id="tlm" type="text" placeholder="Telemóvel">${tl}`
        tlm.innerHTML = t

        let a = `<text class="form-control valid" name="name" id="nif" type="text" placeholder="NIF">${nif}`
        contribuinte.innerHTML = a
    }
    renderUser()

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const name = document.getElementById("nome").value
        console.log(name)
        const mail = document.getElementById("email").value
        const phone = document.getElementById("tlm").value
        const contribuinte = document.getElementById("contribuinte").value
        const form = document.getElementById("contactForm").value
        const passAntiga = document.getElementById("passAntiga").value
        const passNova = document.getElementById("passNova").value
       
        const user = {
            name: name,
            email: mail,
            phone: phone
        }
        console.log("---------")
        console.log(user)

        if (passAtual)
/*
        responseEd = await fetch(`https://backend-easyfestival.herokuapp.com/updateProduct`, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            },
            method: "PUT",
            body: JSON.stringify(user)

        })
*/
        swal({ type: 'success', title: 'Dados editados', text: 'Ação concluída com sucesso' })

    })


}