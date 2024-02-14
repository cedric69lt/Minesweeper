import { useRecoilState } from 'recoil';
import CalendarIcon from '../../assets/calendar';
import Replay from '../../assets/replay';
import Settings from '../../assets/settings';
import TimerIcon from '../../assets/timer';
import './styles.scss';
import { gameStateAtom } from '../../contexts/gameState';

const arrayBoard = [
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
	{ date: '12/06/2014', time: '1m 26s' },
];

const LeaderBoard = () => {
	const [, setGameState] = useRecoilState(gameStateAtom);

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
					{arrayBoard.map((item, index) => {
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
					onClick={() => setGameState((prev) => ({ ...prev, status: 'idle' }))}
				>
					<Replay />
					Rejouer
				</button>
			</div>
		</>
	);
};

export default LeaderBoard;
