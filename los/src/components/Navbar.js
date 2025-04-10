import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        storedName && setUsername(storedName);
    }, [])

    
    const handleLogout = () => {
        axios.post('/logout').catch(({ message }) => setError(message));
        !error && sessionStorage.clear();

        router.push("/"); // Redirection avec router
    };

    return (
        <>
            <nav className="navbar bg-dark text-white p-3 d-flex justify-content-between">
                <h2>League Of Stones</h2>

                {username && (
                    <div className="d-flex align-items-center">
                        <span className="fw-bold me-2 col-4">{username} </span>
                        <button className="btn btn-danger me-2" onClick={handleLogout}>
                            Déconnexion
                        </button>
                    </div>
                )}
            </nav>

            {error && <p>{error}</p>}
        </>

    )
};

export default Navbar;