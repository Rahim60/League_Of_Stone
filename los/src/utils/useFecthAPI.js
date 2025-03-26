import { useState } from "react";

export const useFetchAPI = (methodType, endpoints, bodyVal=null, headerToken="") => {
    const [err, setError] = useState("");
    const [res, setRes] = useState([]);

    const fetchFunc = async () => {
        const url = `http://localhost:4000/${endpoints}`;
        const request = {
            method : methodType,
            headers : {
                "Content-Type" :  "application/json",
                ...(headerToken && {"Authorisation" : `Bearer ${headerToken}`})
            },
            ...(bodyVal && {body : JSON.stringify(body)})
        };
    
        try{
            const response = await fetch(url, request);
            if (!response.ok) throw new Error("Erreur lors de la connexion a l'API");
            const data = await response.json();
            if (data?.message == "error") throw new Erreur ("Donnée erronée");
            setRes(data?.data)
        } catch (error){ setError(error.message) };
    }

    return [res, fetchFunc, err]
}