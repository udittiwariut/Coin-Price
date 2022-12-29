import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import millify from "millify";
import dateFormat from "dateformat";
import { makeCoinRequest } from "../utils/coinApiRequest";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinHistory } from "../store/coin/coin.selector";

const Graph = ({ coinId }) => {
	let priceData = [];
	let dateData = [];
	const dispatch = useDispatch();
	const [timePeriod, setTimePeriod] = useState("7d");
	const coinHistoryData = useSelector(coinHistory);
	useEffect(() => {
		const getCoinHistory = async () => {
			const coinHistory = await makeCoinRequest(
				`/coin/${coinId.split(":")[1]}/history`,
				{
					params: {
						referenceCurrencyUuid: "yhjMzLPhuIDl",
						timePeriod: timePeriod,
					},
				}
			);
			dispatch({
				type: "GET_COIN_HISTORY",
				payload: coinHistory,
			});
		};
		getCoinHistory();
	}, [timePeriod, coinHistoryData]);

	if (coinHistory !== undefined) {
		const arryLength = coinHistoryData?.data?.history?.length;
		for (let i = 0; i < arryLength; i++) {
			priceData.push(millify(coinHistoryData?.data?.history[i]?.price));
			dateData.push(dateFormat(coinHistoryData?.data?.history[i]?.timestamp));
		}
	}

	const yAxis = [
		{
			name: "coin Price",
			data: priceData,
		},
	];
	const opt = {
		chart: {
			height: 500,
			type: "line",
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "smooth",
		},
		title: {
			text: "Product Trends by Month",
			align: "left",
		},
		grid: {
			row: {
				colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: dateData,
		},
	};
	return (
		<div className="chart">
			<select
				className="select-timeperiod"
				defaultValue="7d"
				placeholder="Select Time Period"
				value={timePeriod}
				onChange={(e) => {
					setTimePeriod(e.target.value);
				}}
			>
				<option value="7d">7d</option>
				<option value="30d">30d</option>
				<option value="3m">3m</option>
				<option value="1y">1y</option>
			</select>
			<Chart options={opt} series={yAxis} type="line" height={500} />;
		</div>
	);
};

export default Graph;
