import { useEffect, useState } from "react";
import axios from "axios";

function useFetchData(apiEndpoint) {
    const [alldata, setAlldata] = useState([]); // Fixed destructuring
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const res = await axios.get(apiEndpoint);
                setAlldata(res.data.data); // Set only the data array
                setLoading(false);
            } catch (e) {
                console.error("Fetch error:", e); // Add error logging
                setLoading(false);
            }
        };

        if (apiEndpoint) {
            fetchData();
        }
    }, [apiEndpoint]);

    return { alldata, loading };
}

export default useFetchData;