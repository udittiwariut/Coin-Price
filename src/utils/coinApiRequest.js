import axios from "axios";

const api = axios.create({
	baseURL: "https://coinranking1.p.rapidapi.com",
	withCredentials: true,
	headers: {
		"X-RapidAPI-Key": "346af9de2fmshffb2dad39c9da62p11f1b2jsn932c4b50c6be",
		"X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
	},
});

export function makeRequest(url) {
	return api(url)
		.then((res) => res.data.data)
		.catch((error) => {
			console.log(error);
		});
}
export function makeCoinRequest(url, option) {
	return api(url, option)
		.then((res) => res.data)
		.catch((error) => {
			console.log(error);
		});
}
// actionDispatch("GET_COINS", res.data)
