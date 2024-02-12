import { atom } from 'recoil';

export const gameStateAtom = atom({
	key: 'gameState',
	default: {
		bombs: 0,
		placedFlags: 0,
		status: 'idle',
	},
});
