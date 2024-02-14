import { atom } from 'recoil';

export const gameStateAtom = atom({
	key: 'gameState',
	default: {
		status: 'board',
		difficulty: 'begginer',
		gridSize: 20,
		bombs: 0,
		placedFlags: 0,
	},
});
