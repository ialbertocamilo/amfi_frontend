import { useState, useCallback } from "react";

const useLoader = (initialState=false) => {
    const [loading, setLoading] = useState(initialState);

    const withLoader = useCallback(async (asyncFunction: () => Promise<void>) => {
        setLoading(true);
        try {
            await asyncFunction();
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, withLoader, setLoading };
};

export default useLoader