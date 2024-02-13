// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { MouseEvent, useCallback, useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Context -------------------------------------------------------
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../../contexts/gameState';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { Difficulty } from '../../types/game';
import { discoverAroundCell, genGrid, startGame } from '../../utils/game';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Assets --------------------------------------------------------
import Bomb from '../../assets/bomb.png';
import Flag from '../../assets/flag.png';
import './styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const Grid = () => {
	const [gameState, setGameState] = useRecoilState(gameStateAtom);

	const [grid, setGrid] = useState(genGrid(gameState.gridSize));

	const [, updateGrid] = useState({});
	const forceUpdate = useCallback(() => updateGrid({}), []);

	// ----------------------------------------------------- Actions -------------------------------------------------------
	const handleLeftClick = (ev: MouseEvent, rowIndex: number, colIndex: number) => {
		ev.preventDefault();

		if (grid[rowIndex][colIndex].hidden && !grid[rowIndex][colIndex].flag) {
			setGrid((prev) => {
				if (gameState.status === 'idle') {
					const { grid: newGrid, bombsCount } = startGame(prev, gameState.difficulty as Difficulty, true, rowIndex, colIndex);
					prev = newGrid;

					setGameState((prevGameState) => ({
						...prevGameState,
						status: 'playing',
						bombs: bombsCount,
					}));
				}

				return discoverAroundCell(prev, rowIndex, colIndex);
			});
			forceUpdate();
		}
	};

	const handleRightClick = (ev: MouseEvent, rowIndex: number, colIndex: number) => {
		ev.preventDefault();

		if (grid[rowIndex][colIndex].hidden) {
			setGrid((prev) => {
				if (gameState.status === 'idle') {
					const { grid: newGrid, bombsCount } = startGame(prev, gameState.difficulty as Difficulty, false);
					prev = newGrid;

					setGameState((prevGameState) => ({
						...prevGameState,
						status: 'playing',
						bombs: bombsCount,
					}));
				}

				return prev.map((row, idx) => {
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
			});
		}
	};
	// ---------------------------------------------------------------------------------------------------------------------

	return (
		<div
			className='grid'
			style={{
				gridTemplateRows: `repeat(${gameState.gridSize}, var(--size))`,
			}}
		>
			{grid.map((row, rowIndex) => (
				<div
					key={`row${rowIndex}`}
					className='row'
					style={{
						gridTemplateColumns: `repeat(${gameState.gridSize}, var(--size))`,
					}}
				>
					{row.map((cell, cellIndex) => {
						return (
							<button
								key={`cell${cellIndex}`}
								className={`cell ${cell.hidden ? 'hidden' : cell.value !== 'empty' ? `v${cell.value}` : ''}`}
								onClick={(ev) => handleLeftClick(ev, rowIndex, cellIndex)}
								onContextMenu={(ev) => handleRightClick(ev, rowIndex, cellIndex)}
							>
								{cell.hidden && cell.flag && (
									<img
										src={Flag}
										alt='flat'
									/>
								)}
								{!cell.hidden &&
									(cell.value === 'bomb' ? (
										<img
											src={Bomb}
											alt='bomb'
										/>
									) : cell.value !== 'empty' ? (
										cell.value
									) : (
										''
									))}
							</button>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default Grid;
