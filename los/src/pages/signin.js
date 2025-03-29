import { useState } from "react";
import {useRouter} from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignIn() {
    const router = useRouter(); 
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loginuser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                throw new Error("Réponse du serveur invalide");
            }

            if (!response.ok) {
                throw new Error(`Erreur ${response.status} : ${data.message || response.statusText}`);
            }

            alert("Connexion réussie !");
            console.log("Réponse du serveur :", data);

            const token = data.token;
            const name = data.name;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("name",name);
            console.log(name);

            //redirection vers la page pour choisir son deck 
            router.push("/acceuil");
            return data;
        } catch (err) {
            console.error("Erreur lors de la connexion :", err.message);
            alert("Échec de la connexion : " + err.message);
            return null;
        }
    };

    return (
        <>
            <nav className="navbar bg-dark text-white p-3 d-flex justify-content-between">
                <h2> League Of Stones</h2>
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-light" onClick={() => router.push("/inscription")}>
                        Creer un Compte
                    </button>
                </div>
            </nav>

            <div className="d-flex justify-content-center align-items-center vh-100 ">
                {/* <div className=" text-white p-4 rounded-4 "> */}
                    {/* Titre Connexion */}

                    {/* Formulaire */}
                <form onSubmit={loginuser} className="border border-3 p-3 w-50 rounded shadow-lg">

                        <div className="text-center mb-3 ">
                            <h2 className="rounded">
                                CONNEXION
                            </h2>
                        </div>

                        {/* Champ Email */}
                        <div className="mb-3">
                            <label className="form-label fs-5">Email :</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-control rounded border-3"
                            />
                        </div>

                        {/* Champ Mot de Passe */}
                        <div className="mb-3">
                            <label className="form-label fs-5">Mot de passe :</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            className="form-control rounded border-3"
                            />
                        </div>

                        {/* Bouton de Soumission */}
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">
                                Soumettre
                            </button>
                        </div>
                    </form>
                {/* </div> */}
            </div>
        </>
        
    );
}
