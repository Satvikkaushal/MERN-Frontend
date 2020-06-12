import React, { Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { signOut, IsAuthenticated } from '../auth/helper';


const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#4AD132" }
    } else {
        return { color: "#FFFFFF" }
    }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tab bg-dark">
            <li className="nav-item">
                <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/user/Dashboard")} className="nav-link" to="/user/Dashboard">Dashboard</Link>
            </li>
            {!IsAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link style={currentTab(history, "/signIn")} className="nav-link" to="/signIn">SignIn</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTab(history, "/signUp")} className="nav-link" to="/signUp">SignUp</Link>
                    </li>
                </Fragment>
            )}

            {IsAuthenticated() && IsAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link style={currentTab(history, "/adminDashboard")} className="nav-link" to="/admin/DashBoard">Admin dashboard</Link>
                </li>
            )}
            {IsAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning"
                        onClick={() => {
                            signOut(() => {
                                history.push("/")
                            })
                        }}>
                        SignOut
                    </span>
                </li>
            )}
        </ul>
    </div>
)
export default withRouter(Menu);
