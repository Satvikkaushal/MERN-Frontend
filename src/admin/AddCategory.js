import React, { useState } from 'react'
import Base from '../core/Base';
import { IsAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';


const AddCategory = () => {
    //to do try other approch
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const { user, token } = IsAuthenticated();

    const handleChange = event => {
        setError("");
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            })
            .catch(err => console.log(err))
    }

    const goback = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashBoard">Go Back</Link>
        </div>
    )

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Category is added succesfully</h4>
        }
    };


    const errorMessage = () => {
        if (error) {
            return <h4 className="text-danger">failed</h4>
        }
    };

    const categoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input
                    type="text"
                    className="form-control my-3"
                    autoFocus
                    required
                    onChange={handleChange}
                    value={name}
                    placeholder="Ex. Summer"
                />
                <button onClick={onSubmit} className="btn-outline-info">Create category</button>
            </div>

        </form>
    )
    return (
        <Base tittle="Create category" description="Add a new category"
            className="container bg-info rounded p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {categoryForm()}{goback()}
                </div>
            </div>

        </Base>
    )
}

export default AddCategory;
