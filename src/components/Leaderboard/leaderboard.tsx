// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useEffect, useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------ Recoil & Stockage --------------------------------------------------
import localforage from 'localforage';
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../../contexts/gameState';
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ Types --------------------------------------------------------
import { LeaderBoardItem } from '../../types/game';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Assets --------------------------------------------------------
import CalendarIcon from '../../assets/calendar';
import Replay from '../../assets/replay';
import Settings from '../../assets/settings';
import TimerIcon from '../../assets/timer';
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
	const [, setGameState] = useRecoilState(gameStateAtom);
	const [data, setData] = useState<LeaderBoardItem[]>([]);

	useEffect(() => {
		const getData = async () => {
			const storeData = await store.getItem<LeaderBoardItem[]>('leaderboard');
			if (storeData) {
				setData(storeData);
			}
		};

		if (data.length === 0) {
			getData();
		}
	}, []);

	return (
		<>
			<h1 className='title'>Time Leaderboard</h1>

			<div className='board'>
				<div className='header'>
					<p>#</p>
					<p>
						<CalendarIcon />
						Date
					</p>
					<p>
						<TimerIcon />
						Time
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
								<span>{item.time}</span>
							</div>
						);
					})}
				</div>
			</div>

			<div className='controls'>
				<button
					className='controlButton home'
					onClick={() => setGameState((prev) => ({ ...prev, status: 'settings' }))}
				>
					<Settings />
					Paramètres
				</button>

				<button
					className='controlButton replay'
					onClick={() => setGameState((prev) => ({ ...prev, status: 'idle', endType: '', placedFlags: 0, bombs: 0, gameTime: 0 }))}
				>
					<Replay />
					Rejouer
				</button>
			</div>
		</>
	);
};

export default LeaderBoard;
