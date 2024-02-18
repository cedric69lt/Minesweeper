import { atom } from 'recoil';

/**
 * Values:
 * - Status: 'settings' | 'idle' | 'playing' | 'board'
 * - Difficulty: 'beginner' | 'intermediate' | 'expert'
 * - Grid Size: 12, 16, 20
 * - Bombs: ]0;{GridSize}]
 * - Placed Flags: [0;{GridSize}]
 * - gameTime: Timestamp
 * - End Type: 'win' | 'loose'
 */

export const gameStateAtom = atom({
	key: 'gameState',
	default: {
		status: 'board',
		difficulty: 'beginner',
		gridSize: 12,
		bombs: 0,
		placedFlags: 0,
		gameTime: '',
		endType: '',
	},
});
