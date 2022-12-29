const coinsReducer = (state = { coins: {} }, action) => {
	const { type, payload } = action;

	switch (type) {
		case "GET_COINS":
			return { ...state, coins: { ...payload } };

		default:
			return state;
	}
};

export default coinsReducer;

export const coinHistoryReducer = (state = { coinHistory: {} }, action) => {
	const { type, payload } = action;

	switch (type) {
		case "GET_COIN_HISTORY":
			return { ...state, coinHistory: { ...payload } };

		default:
			return state;
	}
};
