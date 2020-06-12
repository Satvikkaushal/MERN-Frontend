import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IsAuthenticated } from './index';

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                IsAuthenticated() && IsAuthenticated().user.role === 1 ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/signIn",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}

export default AdminRoute;
