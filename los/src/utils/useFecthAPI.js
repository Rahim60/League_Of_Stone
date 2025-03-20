import { useEffect } from "react";

export const useFetchAPI = (methodType, bodyVal=null, endpoints="", headerToken="") => {
    const [err, setError] = useState("");
    const [res, setRes] = useState([]);

    useEffect(async () => {
        const URL = 'http://localhost:4000/';
        const url = endpoints ? `${URL}${endpoints}`: URL;
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
    }, [methodType, URL, bodyVal, headerToken, endpoints])

    return {res, err}
}

export const isAuthentic = () => {
    const token = localStorage.getItem("token");
    return token != "";
};

export const updateMatchRequest = () => {

};