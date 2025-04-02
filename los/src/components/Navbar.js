import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {

    const [username, setUsername] = useState("");
    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        storedName && setUsername(storedName);
    }, [])

    const router = useRouter();
    
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        router.push("/"); // Redirection avec router
        sessionStorage.clear();
    };

    return (
        <nav className="navbar bg-dark text-white p-3 d-flex justify-content-between">
            <h2>League Of Stones</h2>
            
            {username && (
                <div className="d-flex align-items-center">
                    <span className="fw-bold mr-3 col-4">{username} </span>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Déconnexion
                    </button>
                </div>
            )}
        </nav>
    )
};

export default Navbar;