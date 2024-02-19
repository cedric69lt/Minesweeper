// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useEffect, useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------- Context & Stockage --------------------------------------------------
import localforage from 'localforage';
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../../contexts/gameState';
import { langAtom } from '../../contexts/langState';
// ---------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------- Utils & Types ----------------------------------------------------
import { Difficulty, LeaderBoardItem } from '../../types/game';
import { getDifficultyLabel } from '../../utils/generics';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Assets --------------------------------------------------------
import CalendarIcon from '../../assets/calendar';
import Replay from '../../assets/replay';
import Settings from '../../assets/settings';
import TimerIcon from '../../assets/timer';
import Trash from '../../assets/trash';
import DifficultyIcon from '../../assets/difficulty';
import Size from '../../assets/size';
import './styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const store = localforage.createInstance({
	name: 'leaderboard',
	driver: localforage.INDEXEDDB,
	version: 1.0,
	storeName: 'leaderboard',
	description: 'Store 10 best game time',
});

const LeaderBoard = () => {
	const [gameState, setGameState] = useRecoilState(gameStateAtom);
	const [data, setData] = useState<LeaderBoardItem[]>([]);

	const [lang] = useRecoilState(langAtom);

	const getData = async () => {
		const storeData = await store.getItem<LeaderBoardItem[]>(`${gameState.difficulty}:${gameState.gridSize}`);

		setData(storeData || []);
	};

	useEffect(() => {
		if (data.length === 0) {
			getData();
		}
	}, [data.length, getData]);

	const clearAllLeaderboards = async () => {
		const keys = await store.keys();

		for (let i = 0; i < keys.length; i++) {
			await store.removeItem(keys[i]);
		}
		getData();
	};

	return (
		<>
			<h1 className='title'>{lang.config.leaderboardTitle}</h1>

			<div className='board'>
				<div className='header'>
					<p>#</p>
					<p>
						<CalendarIcon />
						{lang.config.date}
					</p>
					<p>
						<DifficultyIcon style={{ rotate: '-45deg' }} />
						{lang.config.settings.difficulty.label}
					</p>
					<p>
						<Size />
						{lang.config.settings.size.label}
					</p>
					<p>
						<TimerIcon />
						{lang.config.time}
					</p>
				</div>

				<div className='scoresContainer'>
					{data.map((item, index) => {
						return (
							<div
								className='score'
								key={`score#${index}`}
							>
								<span>{index + 1}</span>
								<span>{item.date}</span>
								<span>{lang.config.settings.difficulty.values[gameState.difficulty]}</span>
								<span>{gameState.gridSize}</span>
								<span>{item.time}</span>
							</div>
						);
					})}
				</div>
			</div>

			<div className='controls'>
				<button
					className='controlButton home'
					onClick={() => setGameState((prev) => ({ ...prev, status: 'settings', endType: '', placedFlags: 0, bombs: 0, gameTime: '' }))}
				>
					<Settings />

					{lang.config.settingsBtn}
				</button>

				<button
					className='controlButton replay'
					onClick={() => setGameState((prev) => ({ ...prev, status: 'idle', endType: '', placedFlags: 0, bombs: 0, gameTime: '' }))}
				>
					<Replay />

					{lang.config.replay}
				</button>

				<button
					className='controlButton clear'
					onClick={async () => {
						await store.setItem(`${gameState.difficulty}:${gameState.gridSize}`, []);
						await getData();
					}}
				>
					<Trash />
					{lang.config.delete}
				</button>

				<button
					className='controlButton clearAll'
					onClick={clearAllLeaderboards}
				>
					<Replay />
					{lang.config.deleteAll}
				</button>
			</div>
		</>
	);
};

export default LeaderBoard;
