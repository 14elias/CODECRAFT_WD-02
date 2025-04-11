import { is_authenticated } from "../api/endpoints";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const response = await is_authenticated();
            if (response.message === "authenticated") {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false)
                navigate("/login");
            }
        };
        fetchAuthStatus();
    }, [navigate]);

    if(isAuthenticated===null){
        return <p>loading...</p>
    }


    return isAuthenticated ? children : (<h1>authorization is mandatory</h1>);
}

export default ProtectedRoute;