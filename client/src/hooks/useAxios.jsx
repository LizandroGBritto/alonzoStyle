import axios from "axios";
import { useState, useEffect } from "react";

const useAxios = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(url, { withCredentials: true })
            .then(res => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.response?.data?.error?.message || 'Error desconocido');
                setIsLoading(false);
            });
    }, [url]);

    return { data, isLoading, error };
};

export default useAxios;
