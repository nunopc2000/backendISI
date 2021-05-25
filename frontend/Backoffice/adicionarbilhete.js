window.onload = () => {

    const frm = document.getElementById("frmBilhete")

    frm.addEventListener("submit", async (event) => {
        event.preventDefault()
        const nome = document.getElementById("tipo").value
        const preco = document.getElementById("preco").value
        const stock = document.getElementById("qtd").value

        const user = {
            nome: nome,
            preco: preco,
            stock: stock
        }

        const userIX = {
            nome: nome,
            preco: preco
        }

        console.log(user)
        response = await fetch(`http://localhost:5050/addTicket`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(user)
        })


        responseIX = await fetch(`http://localhost:5050/createItems`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(userIX)
        })


        swal({ type: 'success', title: 'Bilhete adicionado', text: 'Ação concluída com sucesso' })
        frm.reset()
    })

}