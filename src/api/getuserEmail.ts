import axios from 'axios';

const API_URL = 'http://localhost:5173/api'; 

export const getUserEmail = async (token: string): Promise<string | null> => {
    try {
        const response = await axios.get(`${API_URL}/Users/email`, {
            withCredentials: true, 
        });
        const token_topass = token;
        console.log(token_topass)
        return response.data;
    } catch (error) {
        console.error("Error fetching user email:", error);
        return null;
    }
};
