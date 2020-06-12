const { API } = require("../../backend");

export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "Post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: orderData })
            .then(response => {
                return response.json()
            })
            .catch(err => console.log(err))
    })
}