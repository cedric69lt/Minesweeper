// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useEffect, useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Assets --------------------------------------------------------
import Clock from '../../../assets/clock';
import '../styles.scss';
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../../../contexts/gameState';
import { saveToLocalStorage } from '../../../utils/generics';
// ---------------------------------------------------------------------------------------------------------------------

const Timer = () => {
	const [gameState, setGameState] = useRecoilState(gameStateAtom);

	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
	const [startedTime, setStartedTime] = useState<number | null>(null);
	const [displayedTime, setDisplayedTime] = useState<string>('00:00');

	useEffect(() => {
		if (gameState.status === 'win' || gameState.status === 'loose') {
			setStartedTime(null);
		}
	}, [gameState.status]);

	useEffect(() => {
		if (!startedTime && gameState.endType === '' && gameState.status === 'playing') {
			const now = Date.now();
			setStartedTime(now);

			const interval = setInterval(() => {
				const elapsedTime = (Date.now() - now) / 1000;

				const seconds = Math.floor(elapsedTime % 60);
				const strSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

				const minutes = Math.floor(elapsedTime / 60);
				const strMinute = minutes < 10 ? `0${minutes}` : `${minutes}`;

				setDisplayedTime(`${strMinute}:${strSeconds}`);
			}, 500);

			setIntervalId(interval);
		}
	}, [startedTime, gameState.endType, gameState.status]);

	useEffect(() => {
		if (intervalId && gameState.endType !== '') {
			setGameState((prev) => ({
				...prev,
				gameTime: displayedTime,
			}));

			clearInterval(intervalId);
			saveToLocalStorage(displayedTime);
		}
	}, [intervalId, gameState.endType, setGameState, displayedTime]);

	return (
		<div className='statContainer'>
			<Clock />
			<p>{displayedTime}</p>
		</div>
	);
};

export default Timer;
