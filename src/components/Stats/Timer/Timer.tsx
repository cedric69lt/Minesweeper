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
// ---------------------------------------------------------------------------------------------------------------------

const Timer = () => {
	const [{ status }] = useRecoilState(gameStateAtom);

	const [startedTime, setStartedTime] = useState<number | null>(null);
	const [displayedTime, setDisplayedTime] = useState<string>('00:00');

	useEffect(() => {
		if (status === 'playing') {
			setStartedTime(Date.now());
		} else if (status === 'win' || status === 'loose') {
			setStartedTime(null);
		}
	}, [status]);

	useEffect(() => {
		if (startedTime) {
			const interval = setInterval(() => {
				const elapsedTime = (Date.now() - startedTime) / 1000;

				const seconds = Math.floor(elapsedTime % 60);
				const strSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

				const minutes = Math.floor(elapsedTime / 60);
				const strMinute = minutes < 10 ? `0${minutes}` : `${minutes}`;

				setDisplayedTime(`${strMinute}:${strSeconds}`);
			}, 500);

			return () => clearInterval(interval);
		}
	}, [startedTime]);

	return (
		<div className='statContainer'>
			<Clock />
			<p>{displayedTime}</p>
		</div>
	);
};

export default Timer;
