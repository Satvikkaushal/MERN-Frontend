import { API } from "../../backend";


//category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: "Post",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)

    }).then(Response => {
        return Response.json();
    })
        .catch(err => console.log(err));
}

//get all categories
export const getAllcategories = () => {
    //console.log("getAllcategories");
    return fetch(`${API}/categories`, {
        method: "Get"
    }).then(Response => {
        // console.log(Response.json());
        return Response.json();
    })
        .catch(err => console.log(err));
}

//products
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: "Post",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product

    }).then(Response => {
        return Response.json();
    })
        .catch(err => console.log(err));
}


export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: "Get"
    }).then(Response => {
        return Response.json();
    })
        .catch(err => console.log(err));
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "Get"
    }).then(Response => {
        return Response.json();
    })
        .catch(err => console.log(err));
}


export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product

    }).then(Response => {
        return Response.json();
    })
        .catch(err => console.log(err));
}


export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }

    }).then(Response => {
        return Response.json();
    })
        .catch(err => console.log(err));
}