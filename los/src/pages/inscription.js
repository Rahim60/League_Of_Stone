import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarDeb from "@/components/NavbarDeb";
import { useFetch } from "@/utils/axios-config";
import axios from "axios";

export default function Inscription() {
    const [formData, setFormData] = useState({
        username: "", email: "",
        password: "", confirmPassword: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const senduserdata = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas !");
            return;
        }

        axios.post("/user", {
            name: formData.username,
            email: formData.email,
            password: formData.password
        }).catch(({ message }) => setError(message))
    };

    return (
        <>
            <NavbarDeb action={"Connexion"} />

            <div className="container mt-5 d-flex justify-content-center">
                <div className="card p-4 shadow-lg rounded w-50 ">
                    <h2 className="text-center mb-4">INSCRIPTION</h2>
                    {error && <p className="alert alert-danger">{error}</p>}
                    <form onSubmit={senduserdata}>
                        <div className="mb-3">
                            <label className="form-label">Pseudo</label>
                            <input
                                type="text" name="username" className="form-control"
                                value={formData.username} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email" name="email" className="form-control"
                                value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mot de passe</label>
                            <input
                                type="password" name="password" className="form-control"
                                value={formData.password} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirmer le mot de passe</label>
                            <input
                                type="password" name="confirmPassword" className="form-control"
                                value={formData.confirmPassword} onChange={handleChange} required />
                        </div>

                        <div className="w-100 text-center">
                            <button type="submit" className="btn btn-success">
                                S&apos;inscrire
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
}
