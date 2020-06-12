import { API } from "../../backend";
//API : http://localhost:8000/api

export const signUp = user => {
    return fetch(`${API}/signUp`, {
        method: "Post",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(Response => {
            return Response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

export const signIn = user => {
    return fetch(`${API}/signIn`, {
        method: "Post",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(Response => {
            return Response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

export const signOut = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next();
        return fetch(`${API}/signOut`, {
            method: "Get"
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
}

export const IsAuthenticated = () => {
    if (typeof window == undefined) {
        return (false);
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else {
        return false;
    }


}