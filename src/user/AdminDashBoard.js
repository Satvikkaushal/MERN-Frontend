import React from 'react'
import Base from "../core/Base"
import { IsAuthenticated } from "../auth/helper"
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {

    const { user: { name, email, role } } = IsAuthenticated();

    const Adminleft = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success">Create Categorys</Link>
                        <Link to="/admin/categories" className="nav-link text-success">Manage Categorys</Link>
                        <Link to="/admin/create/product" className="nav-link text-success">Create Products</Link>
                        <Link to="/admin/products" className="nav-link text-success">Manage Products</Link>
                        <Link to="/admin/orders" className="nav-link text-success">Manage orders</Link>
                    </li>
                </ul>
            </div>
        )
    }


    const AdminRight = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name</span>{name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email</span>{email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-2">Admin Priviledge</span>
                    </li>
                </ul>

            </div>
        )
    }

    return (
        <Base tittle="Admin area" className="container bg-success p-4">
            <div className="row">
                <div className="col-3">{Adminleft()}</div>
                <div className="col-9">{AdminRight()}</div>

            </div>


        </Base>
    )
}


export default AdminDashBoard;
