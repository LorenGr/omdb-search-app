const API_KEY = '6c5d7d44';
const API_BASEURL = "http://www.omdbapi.com";

export const fetchApi = async ({ type, year, title, onSuccess, onFail, onError }) => {
    try {
        const response = await fetch(`${API_BASEURL}/?s=${encodeURIComponent(title)}&type=${type}&y=${year}&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Response === "True") {
            onSuccess(data);
        } else {
            onFail(data);
        }
    } catch (error) {
        onError(error);
    }

}