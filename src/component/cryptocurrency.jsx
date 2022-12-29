import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import millify from "millify";
import { coins } from "./../store/coin/coin.selector";
import "./cryptocurrency.css";
import { Link } from "react-router-dom";

export const Cryptocurrency = ({ simplified }) => {
	const coinsData = useSelector(coins);
	const [coinsSelector, setCoinselector] = useState([]);
	const [search, setSearch] = useState([]);

	const coinDataSelector = () => {
		if (coinsData !== undefined && simplified === true) {
			const simplifiedView = coinsData.filter((_, i) => i < 15);
			setCoinselector(simplifiedView);
		}
		if (coinsData !== undefined && simplified === undefined) {
			const fullView = coinsData.filter((coin) =>
				coin.name.toLowerCase().includes(search)
			);
			setCoinselector(fullView);
		}
	};
	useEffect(() => {
		coinDataSelector();
	}, [coinsData, search]);

	return (
		<div className="crypto-currencies-page">
			{simplified === undefined ? (
				<div className="search-bar">
					<input
						type="text"
						placeholder="Search Cryptocurrency"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			) : (
				""
			)}

			<div
				className="crypto-currencies-grid"
				style={
					simplified === undefined
						? { marginLeft: "20px", marginRight: "20px" }
						: {}
				}
			>
				{coinsSelector
					? coinsSelector.map((coin, i) => (
							<Link key={coin.rank} to={`/crypto/:${coin.uuid}`}>
								<div className="coin-grid">
									<div className="coin-grid-header">
										<h4>{`${coin.rank}.${coin.name}`}</h4>
										<img
											className="coin-icon"
											src={coin.iconUrl}
											alt="Coin Img"
										/>
									</div>

									<div className="coin-grid-body">
										<p>Price: {millify(coin.price)}</p>
										<p>Market Cap: {millify(coin.marketCap)}</p>
										<p>Daily Change: {coin.change}</p>
									</div>
								</div>
							</Link>
					  ))
					: "...loding"}
			</div>
		</div>
	);
};
