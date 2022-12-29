import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import slug from "slug";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import "./cryptodetail.css";
import { makeCoinRequest } from "../utils/coinApiRequest";
import Graph from "./chart";

export const Cryptodetail = () => {
	const { coinId } = useParams();
	const [coin, setCoin] = useState({
		allTimeHigh: "",
		btcPrice: "",
		change: "",
		color: "",
		description: "",
		numberOfExchanges: "",
		numberOfMarkets: "",
		price: "",
		rank: "",
		tier: "",
		websiteUrl: "",
		symbol: "",
		websiteUrl: "",
	});

	useEffect(() => {
		const cooinDataSelector = async () => {
			const coinData = await makeCoinRequest(`/coin/${coinId.split(":")[1]}`);
			setCoin({ ...coinData.data.coin });
		};
		cooinDataSelector();
	}, [coinId]);
	console.log(coin);

	const {
		allTimeHigh,
		btcPrice,
		change,
		color,
		description,
		numberOfExchanges,
		numberOfMarkets,
		price,
		rank,
		tier,
		websiteUrl,
		marketCap,
		name,
		symbol,
	} = coin;

	return (
		<div className="cryptodetail-page">
			<div className="title">
				<h1 className="currency-name" style={{ color: color }}>
					{name} ({slug(`${name} ${symbol}`, "-")}) price
				</h1>
				<p>
					{name} price in US dollar live, view statacies, makrket cap, supply
				</p>
				<br />
			</div>

			<Graph coinId={coinId} />
			<div className="coin-stats">
				<div className="value-stats">
					<h2> {symbol}-stats </h2>
					<h3>An over view showing stats of {name}</h3>
					<br />
					<div>Price: {millify(price)}</div>
					<div>All time High: {millify(allTimeHigh.price)}</div>
					<div>Rank: {rank}</div>
					<div>Market Cap: {millify(marketCap)}</div>
					<div> Tire: {tier}</div>
					<div>
						Btc-Price:
						{btcPrice > Math.floor(btcPrice)
							? ` 0.${btcPrice.split(".")[1].slice(0, 3)}`
							: ` ${btcPrice}`}
					</div>
				</div>
				<div className="outher-value-stats">
					<h2> Other stats </h2>
					<h3>An Overview showing stats of all other cryptocurrency</h3>
					<br />
					<div>Number Of Exchanges: {numberOfExchanges}</div>
					<div>Number Of Markets: {numberOfMarkets}</div>
					<div>Change: {change}</div>
				</div>
			</div>
			<div className="discription">
				<h3> What is {name}</h3>
				{HTMLReactParser(description)}
				<h3>Official webSite link </h3>
				{websiteUrl}
			</div>
		</div>
	);
};
