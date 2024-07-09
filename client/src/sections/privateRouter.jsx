import {Navigate, Outlet} from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "../context/UserContext";

const PrivateRoute = () => {
    const {token} = useContext(UserContext);
    console.log(token);
    return token ? (
        <Outlet/>
    ) : (
        <Navigate to="/login" replace/>
    );
};

export default PrivateRoute;
