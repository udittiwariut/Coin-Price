import { createSelector } from "@reduxjs/toolkit";

const selectCoinData = (state) => state.coins.coins;
const selectCoinHistory = (state) => state.coinHistory.coinHistory;

export const coinStats = createSelector(selectCoinData, (data) => data.stats);
export const coins = createSelector(selectCoinData, (data) => data.coins);
export const coinHistory = createSelector(selectCoinHistory, (data) => data);
