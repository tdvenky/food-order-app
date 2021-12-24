import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const get = async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(requestConfig.url);

            if(!response) {
                throw new Error('Get request failed!');
            }

            const data = response.data;
            applyData(data);
        } catch(err){
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return {
        isLoading,
        error,
        get
    };
};

export default useAxios;