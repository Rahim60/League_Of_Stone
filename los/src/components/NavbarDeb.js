import { useRouter } from "next/router";

const NavbarDeb = ({ action }) => {

    const router = useRouter();

    return (
        <nav className="navbar bg-dark text-white p-3 d-flex justify-content-between">
            <h2>League Of Stones</h2>

            <div className="d-flex align-items-center">
                <button className="btn btn-outline-light" onClick={action === "Connexion" ? () => router.push("/") : () => router.push("/inscription")}>
                    {action}
                </button>
            </div>
        </nav>
    )
}

export default NavbarDeb;