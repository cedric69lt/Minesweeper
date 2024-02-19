// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useEffect, useRef } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------- Context & Stockage --------------------------------------------------
import localforage from 'localforage';
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../../contexts/gameState';
import { langAtom } from '../../contexts/langState';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Styles --------------------------------------------------------
import Size from '../../assets/size';
import Difficulty from '../../assets/difficulty';
import './styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const store = localforage.createInstance({
	name: 'leaderboard',
	driver: localforage.INDEXEDDB,
	version: 1.0,
	storeName: 'leaderboard',
	description: 'Store 10 best game time',
});

const Home = () => {
	const difficultyRef = useRef<HTMLSelectElement>(null);
	const sizeRef = useRef<HTMLSelectElement>(null);

	const [, setGameState] = useRecoilState(gameStateAtom);
	const [lang] = useRecoilState(langAtom);

	const onClick = () => {
		if (difficultyRef.current !== null && sizeRef.current !== null) {
			const difficulty = difficultyRef.current.value;
			const size = sizeRef.current.value;

			const initIDB = async () => {
				if ((await store.getItem(`${difficulty}:${size}`)) === null) {
					await store.setItem(`${difficulty}:${size}`, []);
				}
			};
			initIDB();

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
			<h1 className='title'>{lang.config.appTitle}</h1>

			<div className='settingsContainer'>
				<div className='selectorBox'>
					<p className='settingLabel'>
						<Size />
						{lang.config.settings.size.label}
					</p>
					<select
						ref={sizeRef}
						name='gridSize'
						className='select'
						defaultValue={'12'}
					>
						<option value='12'>{lang.config.settings.size.values.small}</option>
						<option value='16'>{lang.config.settings.size.values.medium}</option>
						<option value='20'>{lang.config.settings.size.values.large}</option>
					</select>
				</div>

				<div className='selectorBox'>
					<p className='settingLabel'>
						<Difficulty />
						{lang.config.settings.difficulty.label}
					</p>
					<select
						ref={difficultyRef}
						name='difficulty'
						className='select'
						defaultValue={'beginner'}
					>
						<option value='beginner'>{lang.config.settings.difficulty.values.beginner}</option>
						<option value='intermediate'>{lang.config.settings.difficulty.values.intermediate}</option>
						<option value='expert'>{lang.config.settings.difficulty.values.expert}</option>
					</select>
				</div>

				<button
					className='startButton'
					onClick={onClick}
				>
					{lang.config.start}
				</button>
			</div>
		</div>
	);
};

export default Home;
