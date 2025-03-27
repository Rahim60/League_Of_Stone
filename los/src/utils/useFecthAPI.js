import { useState, useEffect } from 'react';

export const useFetchGet = (url, token) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [url, token]);

    return { data, error };
};


export const useFetchAPI = (url, method, token) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const execute = async (body) => {
        try {
            const response = await fetch(url, {
                method: method.toUpperCase(),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body : body ? JSON.stringify(body) : null,
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return { data, error, execute };
}; 