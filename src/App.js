import React, { useEffect } from "react";
import NavBar from "./component/navbar";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./component/home";
import { Cryptocurrency } from "./component/cryptocurrency";
import { Cryptodetail } from "./component/cryptodetail";
import { Exchanges } from "./component/exchanges";
import { News } from "./component/news";
import { makeRequest } from "./utils/coinApiRequest";
import { useDispatch } from "react-redux";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const getCoin = async () => {
			const coin = await makeRequest("/coins");
			dispatch({
				type: "GET_COINS",
				payload: { ...coin },
			});
		};
		getCoin();
	}, [dispatch]);

	return (
		<div className="App">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="main">
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="cryptocurrences" element={<Cryptocurrency />} />
					<Route path="exchanges" element={<Exchanges />} />
					<Route path="crypto/:coinId" element={<Cryptodetail />} />
					{/* <Route path="crypto/:coinId" element={<News />} /> */}
				</Routes>
			</div>
		</div>
	);
}

export default App;
