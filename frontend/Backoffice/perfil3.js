window.onload = () => {

    const emailStorage = localStorage.id

    const nome = document.getElementById("nome")
    const email = document.getElementById("email")
    const tlm = document.getElementById("tlm")
    const contribuinte = document.getElementById("contribuinte")

    const renderUser = async () => {
    response = await fetch(`http://localhost:5050/userByEmail/${emailStorage}`)
    const pa = await response.json()
    const p = pa.data.items
    console.log(p)
    for (i = 0; i < p.length; i++) {
        //console.log(a[i].item.custom_fields)
        var no = p[i].item.name
        var cf = p[i].item.emails
        var tl = p[i].item.phones
        var nif = p[i].item.custom_fields[2]
        console.log(no)
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