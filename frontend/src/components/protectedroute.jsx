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
                setIsAuthenticated(false);
                navigate("/login"); 
            }
        };
        fetchAuthStatus();
    }, [navigate]);


    if (isAuthenticated === null) {
        return <h1>Loading...</h1>;
    }

    
    return isAuthenticated ? children : null;
}

export default ProtectedRoute;