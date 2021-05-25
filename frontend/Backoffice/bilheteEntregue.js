window.onload = () => {

    const form = document.getElementById("aluguer")

    form.addEventListener("submit", async (event) => {

        event.preventDefault()
        const id_aluguer = document.getElementById("id_aluguer").value
        console.log(id_aluguer)

        const response = await fetch(`https://backend-easyfestival.herokuapp.com/stockMovs`)
        const movs = await response.json()
        console.log(movs)
        let i = 1
        for (const mov of movs) {
            const id = mov.product_stock_id
            if (id == id_aluguer) {
                console.log(mov)
                console.log(id)
                console.log(mov.notes)
                const e = String(mov.notes).split(":")
                const email = e[0]
                const flag = e[1]
                console.log(flag)
                if (flag == 3) {
                    swal({ type: 'error', title: 'Entrega inválida', text: 'Bilhete já foi utilizado' })
                } else {
                    //const notes = email + ":3"
                    console.log("mail:    " + email)
                    //console.log(notes)
                    const user = {
                        notes: email,
                        product_stock_id: id_aluguer
                    }
                    console.log("-----")
                    console.log(user)
                    console.log("-----------")
                    try {
                        response1 = await fetch(`https://backend-easyfestival.herokuapp.com/redeem`, {
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            method: "PUT",
                            body: JSON.stringify(user)

                        })
                        console.log(user)
                        swal({ type: 'success', title: 'Entrega efetuada', text: 'Bilhete entregue com sucesso' })
                    } catch (err) {
                        //console.log("catch")
                        swal({ type: 'error', title: 'Falha na entrega', text: err })
                    }

                }

                i++
            }
        }
        form.reset()
    })



}
