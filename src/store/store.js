import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./coin/coin.reducer";
import { coinHistoryReducer } from "./coin/coin.reducer";
import logger from "redux-logger";
export default configureStore({
	reducer: {
		coins: coinsReducer,
		coinHistory: coinHistoryReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
