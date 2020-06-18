import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signUp } from "../auth/helper"
const Signup = () => {

    const [values, setvalues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false

    });
    const { name, email, password, error, success } = values

    const handleChange = name => event => {
        setvalues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault()
        setvalues({ ...values, error: false })
        signUp({ name, email, password })
            .then(data => {
                if (data.error) {
                    setvalues({ ...values, error: data.error, success: false })
                }
                else {
                    setvalues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-sm-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" value={name} onChange={handleChange("name")} type="text"></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">email</label>
                            <input className="form-control" value={email} onChange={handleChange("email")} type="email"></input>
                        </div>
                        <div className="form-group">
                            <label className="text-light">password</label>
                            <input className="form-control" value={password} onChange={handleChange("password")} type="password"></input>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block"> Submit</button>
                    </form>
                </div>
            </div>
        );
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        New account was created successfully. Please
                        <Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
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



    return (
        <Base tittle="SignUp page">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}

        </Base>
    )
}

export default Signup;