// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Styles --------------------------------------------------------
import { useRef } from 'react';
import './styles.scss';
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../../contexts/gameState';
// ---------------------------------------------------------------------------------------------------------------------

const Home = () => {
	const difficultyRef = useRef<HTMLSelectElement>(null);
	const sizeRef = useRef<HTMLSelectElement>(null);

	const [, setGameState] = useRecoilState(gameStateAtom);

	const onClick = () => {
		if (difficultyRef.current !== null && sizeRef.current !== null) {
			const difficulty = difficultyRef.current.value;
			const size = sizeRef.current.value;

			setGameState((prev) => ({
				...prev,
				difficulty: difficulty,
				gridSize: parseInt(size),
				status: 'idle',
			}));
		}
	};

	return (
		<div className='gameContainer'>
			<h1 className='title'>Démineur</h1>

			<div className='settingsContainer'>
				<div className='selectorBox'>
					<p className='settingLabel'>Taille de la grille</p>
					<select
						ref={sizeRef}
						className='select'
						defaultValue={'12'}
					>
						<option value='12'>Petit</option>
						<option value='16'>Moyen</option>
						<option value='20'>Grand</option>
					</select>
				</div>

				<div className='selectorBox'>
					<p className='settingLabel'>Difficulté</p>
					<select
						ref={difficultyRef}
						className='select'
						defaultValue={'beginner'}
					>
						<option value='beginner'>Facile</option>
						<option value='intermediate'>Moyen</option>
						<option value='expert'>Difficile</option>
					</select>
				</div>

				<button
					className='startButton'
					onClick={onClick}
				>
					Commencer
				</button>
			</div>
		</div>
	);
};

export default Home;
