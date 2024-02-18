// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------- Stockage -------------------------------------------------------
import localforage from 'localforage';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Types --------------------------------------------------------
import { LeaderBoardItem } from '../types/game';
// ---------------------------------------------------------------------------------------------------------------------

export const getRandomArbitrary = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min);
};

const store = localforage.createInstance({
	name: 'leaderboard',
	driver: localforage.INDEXEDDB,
	version: 1.0,
	storeName: 'leaderboard',
	description: 'Store 10 best game time',
});

export const saveToLocalStorage = async (time: string) => {
	let leaderboard = await store.getItem<LeaderBoardItem[]>('leaderboard');

	const currentDate = new Date().toLocaleString().split(' ')[0];

	if (!leaderboard) {
		leaderboard = [];
	}

	leaderboard.push({
		date: currentDate,
		time: `${time.replace(':', 'm ')}s`,
	});

	leaderboard = leaderboard.sort((a, b) => (a.time > b.time ? 1 : -1));

	if (leaderboard.length > 20) {
		leaderboard = leaderboard.slice(0, 20);
	}

	await store.setItem('leaderboard', leaderboard);
};
