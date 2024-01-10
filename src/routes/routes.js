import React from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'


import { Home, Login, Register, Products, Cart, Admin } from "../containers";

import PrivateRoute from "./private-router"
import paths from "../constants/paths";


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route component={Login} path={paths.Login} />
                <Route component={Register} path={paths.Register} />
                <PrivateRoute exact component={Home} path={paths.Home} />
                <PrivateRoute component={Products} path={paths.Products} />
                <PrivateRoute component={Cart} path={paths.Cart} />

                <PrivateRoute component={Admin} path={paths.Order} isAdmin />
                <PrivateRoute component={Admin} path={paths.ProductsList} isAdmin />
            </Switch>
        </Router>
    )
}

export default Routes;
