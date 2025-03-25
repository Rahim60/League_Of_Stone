import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Inscription() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const senduserdata = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/user", { 
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status} : ${response.statusText}`);
            }

            alert("Inscription réussie !");
            const data = await response.json();
            console.log("Réponse du serveur :", data);

        } catch (err) {
            console.error("Erreur lors de la requête :", err);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 image_arriere_plan">
            <div className="card p-4 bg-dark text-white shadow-lg rounded w-50">
                <h2 className="text-center mb-4">INSCRIPTION</h2>
                <form onSubmit={senduserdata}>
                    <div className="mb-3">
                        <label className="form-label">Pseudo</label>
                        <input 
                            type="text" 
                            name="username" 
                            className="form-control"
                            value={formData.username} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control"
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mot de passe</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control"
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirmer le mot de passe</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            className="form-control"
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-outline-light w-100">
                        Soumettre
                    </button>
                </form>
            </div>
        </div>
    );
}
