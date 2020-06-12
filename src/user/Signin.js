import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signIn, authenticate, IsAuthenticated } from "../auth/helper"
const Signin = () => {

    const [values, setvalues] = useState({
        email: "Satvikkaushal8@gmail.com",
        password: "12345",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;

    const { user } = IsAuthenticated();

    const handleChange = name => event => {
        setvalues({ ...values, error: false, [name]: event.target.value })
    }

    const OnSubmit = event => {
        event.preventDefault();
        setvalues({ ...values, error: false, loading: true })
        signIn({ email, password })
            .then(data => {
                if (data.error) {
                    setvalues({
                        ...values, error: data.error, loading: false
                    })
                } else {
                    authenticate(data, () => {
                        setvalues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            })
            .catch(err => console.log(err))

    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/DashBoard"></Redirect>
            } else {
                return <Redirect to="/user/DashBoard"></Redirect>
            }
        }
        if (IsAuthenticated()) {
            return <Redirect to="/"></Redirect>
        }
    }

    const LoadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading ...</h2>
                </div>
            )
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };



    const signInForm = () => {
        return (
            < div className="row" >
                <div className="col-sm-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">email</label>
                            <input onChange={handleChange("email")} className="form-control" value={email} type="email"></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">password</label>
                            <input onChange={handleChange("password")} className="form-control" value={password} type="password"></input>
                        </div>
                        <button onClick={OnSubmit} className="btn btn-success btn-block"> Login</button>
                    </form>
                </div>
            </div >
        );
    }

    return (
        <Base tittle="SignIn page">
            {LoadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;