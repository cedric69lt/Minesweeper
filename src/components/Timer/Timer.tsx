// ---------------------------------------------------------------------------------------------------------------------
//!                                                       Imports
// ---------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------ React --------------------------------------------------------
import { useEffect, useState } from 'react';
// ---------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------- Assets --------------------------------------------------------
import Clock from '../../assets/clock';
import './styles.scss';
// ---------------------------------------------------------------------------------------------------------------------

const Timer = () => {
	const [startedTime] = useState<number>(Date.now());
	const [displayedTime, setDisplayedTime] = useState<string>('00:00');

	useEffect(() => {
		const interval = setInterval(() => {
			const elapsedTime = (Date.now() - startedTime) / 1000;

			const seconds = Math.floor(elapsedTime % 60);
			const strSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

			const minutes = Math.floor(elapsedTime / 60);
			const strMinute = minutes < 10 ? `0${minutes}` : `${minutes}`;

			setDisplayedTime(`${strMinute}:${strSeconds}`);
		}, 500);

		return () => clearInterval(interval);
	}, [startedTime]);

	return (
		<div className='timer'>
			<Clock />
			<p>{displayedTime}</p>
		</div>
	);
};

export default Timer;
