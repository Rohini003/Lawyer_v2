import { useContext, useEffect, useState } from "react";

import { authContext } from "../context/AuthContext";

const useFetchData = (url) => {
    const auth = useContext(authContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${auth.token}` },
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message + "🙁");
                }

                setData(result.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetchData;
