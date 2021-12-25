import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const sendRequest = async ({url, method = 'GET', body = null}, applyData) => {
        setIsLoading(true);
        setError(null);

        let response = null;

        try {
            if(method === 'GET') {
                response = await axios.get(url);
            } else if( method === 'POST') {
                response = await axios.post(url, JSON.stringify(body));
            }

            if(!response) {
                throw new Error(method + 'request failed!');
            }

            applyData(response.data);
        } catch(err){
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return {
        isLoading,
        error,
        sendRequest
    };
};

export default useAxios;