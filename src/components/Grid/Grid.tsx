// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { MouseEvent, useCallback, useEffect, useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { Difficulty } from '../../types/game';
import { discoverAroundCell, genBombs, genGrid, genNumbers } from '../../utils/game';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Assets --------------------------------------------------------
import Bomb from '../../assets/bomb.png';
import Flag from '../../assets/flag.png';
import './styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const Grid = ({ size = 12, difficulty = 'beginner' }) => {
	const [grid, setGrid] = useState(genGrid(size));
	const [gameStatus, setGameStatus] = useState('idle');

	const [, updateGrid] = useState({});
	const forceUpdate = useCallback(() => updateGrid({}), []);

	// ----------------------------------------------------- Actions -------------------------------------------------------
	const handleLeftClick = (ev: MouseEvent, rowIndex: number, colIndex: number) => {
		ev.preventDefault();

		if (grid[rowIndex][colIndex].hidden && !grid[rowIndex][colIndex].flag) {
			setGrid((prev) => {
				if (gameStatus === 'idle') {
					do {
						prev = genNumbers(genBombs(prev, difficulty as Difficulty));
					} while (prev[rowIndex][colIndex].value !== 'empty');
					setGameStatus('started');
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
				return prev.map((row, idx) => {
					if (idx === rowIndex) {
						return row.map((col, idy) => {
							if (idy === colIndex) {
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

	// --- Development
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			document.addEventListener('keyup', (ev) => {
				if (ev.key === 'v') {
					setGrid(() => {
						let newGrid = genGrid(size);

						return genNumbers(genBombs(newGrid, difficulty as Difficulty));
					});
				}
			});
		}
	}, [size, difficulty]);
	// ---------------------------------------------------------------------------------------------------------------------

	return (
		<div
			className='grid'
			style={{
				gridTemplateRows: `repeat(${size}, var(--size))`,
			}}
		>
			{grid.map((row, rowIndex) => (
				<div
					key={`row${rowIndex}`}
					className='row'
					style={{
						gridTemplateColumns: `repeat(${size}, var(--size))`,
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
