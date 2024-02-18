// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { MouseEvent, useCallback, useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Types --------------------------------------------------------
import { SetterOrUpdater } from 'recoil';
import { Difficulty, GridType } from '../../../types/game';
import { GameState } from '../../../types/gameState';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { discoverAroundCell, revealAllGrid, startGame } from '../../../utils/game';
// ---------------------------------------------------------------------------------------------------------------------

export const useActions = (grid: GridType, setGrid: React.Dispatch<React.SetStateAction<GridType>>, gameState: GameState, setGameState: SetterOrUpdater<GameState>) => {
	const [, updateGrid] = useState({});
	const forceUpdate = useCallback(() => updateGrid({}), []);

	const handleLeftClick = (ev: MouseEvent, rowIndex: number, colIndex: number) => {
		ev.preventDefault();

		// Only have action if the cell is hidden and has not a flag on it
		if (grid[rowIndex][colIndex].hidden && !grid[rowIndex][colIndex].flag) {
			setGrid((prev) => {
				let bombsCount: number | null = null;

				// Start the game with making sure the clicked cell will be empty after generation
				if (gameState.status === 'idle') {
					const { grid: newGrid, bombsCount: _bombsCount } = startGame(prev, gameState.difficulty as Difficulty, true, rowIndex, colIndex);
					prev = newGrid;

					bombsCount = _bombsCount;

					setGameState((prevGameState) => ({
						...prevGameState,
						status: 'playing',
						bombs: _bombsCount,
					}));
				}

				// If the clicked cell hide a bomb, loose immediatly
				if (prev[rowIndex][colIndex].value === 'bomb') {
					setGameState((prev) => ({
						...prev,
						endType: 'loose',
					}));
					return revealAllGrid(grid, true);
				}
				// Discover surronding cells if the clicked is empty
				else if (prev[rowIndex][colIndex].value === 'empty') {
					prev = discoverAroundCell(prev, rowIndex, colIndex);
				} else {
					prev[rowIndex][colIndex].hidden = false;
				}

				if (hasWin(prev, bombsCount || gameState.bombs)) {
					setGameState((prev) => ({
						...prev,
						endType: 'win',
					}));
					return revealAllGrid(grid, true);
				}

				return prev;
			});

			// Since React state cannot see if a large nested object has changed, we need to call a forceUpdate method
			forceUpdate();
		}
	};

	const handleRightClick = (ev: MouseEvent, rowIndex: number, colIndex: number) => {
		ev.preventDefault();

		// Only have action if the cell is hidden
		if (grid[rowIndex][colIndex].hidden) {
			setGrid((prev) => {
				let bombsCount: number | null = null;

				// Start the game without making sure the clicked cell will be empty after generation
				if (gameState.status === 'idle') {
					const { grid: newGrid, bombsCount: _bombsCount } = startGame(prev, gameState.difficulty as Difficulty, false);
					prev = newGrid;

					bombsCount = _bombsCount;

					setGameState((prevGameState) => ({
						...prevGameState,
						status: 'playing',
						bombs: _bombsCount,
					}));
				}

				prev = prev.map((row, idx) => {
					if (idx === rowIndex) {
						return row.map((col, idy) => {
							if (idy === colIndex) {
								setGameState((prevGameState) => ({
									...prevGameState,
									placedFlags: col.flag ? prevGameState.placedFlags - 1 : prevGameState.placedFlags + 1,
								}));

								return {
									...col,
									flag: !col.flag,
								};
							}
							return col;
						});
					}
					return row;
				});

				if (hasWin(prev, bombsCount || gameState.bombs)) {
					setGameState((prev) => ({
						...prev,
						endType: 'win',
					}));
					return revealAllGrid(grid, true);
				}

				return prev;
			});
		}
	};

	return {
		handleLeftClick,
		handleRightClick,
	};
};

const hasWin = (grid: GridType, bombs: number) => {
	let bombsFlagged = 0;

	grid.map((row) => {
		row.map((cell) => {
			if (cell.value === 'bomb' && cell.flag === true) {
				bombsFlagged++;
			}
		});
	});

	if (bombsFlagged === bombs) {
		return true;
	}

	return false;
};
