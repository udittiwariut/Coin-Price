import React, { useEffect, useState } from "react";
import { coinStats } from "../store/coin/coin.selector";
import { useSelector } from "react-redux";
import millify from "millify";
import { Link } from "react-router-dom";
import { Cryptocurrency } from "./cryptocurrency";
import "./home.css";

export const Homepage = () => {
	const dataSelector = () => {
		if (data !== undefined) {
			setStats(data);
		}
	};

	const INTAIL_STATE = {
		totalCoins: "0",
		totalMarkets: "0",
		totalMarketCap: "0",
		totalExchanges: "0",
		total24hVolume: "0",
	};
	const [
		{
			totalCoins,
			totalMarkets,
			totalExchanges,
			totalMarketCap,
			total24hVolume,
		},
		setStats,
	] = useState(INTAIL_STATE);

	const data = useSelector(coinStats);
	useEffect(() => {
		dataSelector();
	}, [data]);

	return (
		<div className="home_page">
			<h1>Global Crypto stats</h1>
			<div className="stats-container">
				<div className="grid-item">
					<h3 className="stats">Total Coins</h3>
					{totalCoins}
				</div>
				<div className="grid-item">
					<h3 className="stats">Total Markets</h3>
					{millify(totalMarkets)}
				</div>
				<div className="grid-item">
					<h3 className="stats">Total Exchanges</h3>
					{totalExchanges}
				</div>
				<div className="grid-item">
					<h3 className="stats">Total MarketCap</h3>
					{millify(totalMarketCap)}
				</div>
				<div className="grid-item">
					<h3 className="stats">Total 24h Volume</h3>
					{millify(total24hVolume)}
				</div>
			</div>

			<div className="crypto_currencies">
				<div className="home-heading-containe">
					<h2 className="home-tilte">Top 15 Cryptocurrencies in world</h2>
					<h3 className="show-more">
						<Link to={"/cryptocurrences"}>Show-More</Link>
					</h3>
				</div>
				<Cryptocurrency simplified={true} />
			</div>
			{/* <div className="crypto_news">
				<div className="home-heading-containe">
					<h2 className="home-tilte">Latest crypto News</h2>
					<h3 className="show-more">
						<Link to={"/cryptocurrences"}>Show-More</Link>
					</h3>
				</div>
			</div> */}
		</div>
	);
};
