// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Context -------------------------------------------------------
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../../contexts/gameState';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Hooks --------------------------------------------------------
import { useActions } from './hooks/useActions';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Utils --------------------------------------------------------
import { genGrid } from '../../utils/generation';
import { getCellDisplayContent } from '../../utils/gameInteractions';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Assets --------------------------------------------------------
import Podium from '../../assets/podium';
import './styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const Grid = () => {
	const [gameState, setGameState] = useRecoilState(gameStateAtom);
	const [grid, setGrid] = useState(genGrid(gameState.gridSize));

	const { handleLeftClick, handleRightClick } = useActions(grid, setGrid, gameState, setGameState);

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
								{getCellDisplayContent(cell)}
							</button>
						);
					})}
				</div>
			))}
			{gameState.endType !== '' && (
				<div
					className='overlay'
					style={
						{
							'--overlayColor': gameState.endType === 'win' ? '#5f8e59' : '#ca5940',
						} as React.CSSProperties
					}
				>
					<p className='overlayTitle'>{gameState.endType === 'win' ? 'Gagné !' : 'Perdu !'}</p>
					<button
						className='overlayButton'
						onClick={() => setGameState((prev) => ({ ...prev, status: 'board' }))}
					>
						<Podium />
						Leaderboard
					</button>
				</div>
			)}
		</div>
	);
};

export default Grid;
